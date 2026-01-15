import { MedusaContainer } from '@medusajs/framework'
import { ContainerRegistrationKeys, Modules } from '@medusajs/framework/utils'
import {
  createApiKeysWorkflow,
  createCollectionsWorkflow,
  createInventoryLevelsWorkflow,
  createProductCategoriesWorkflow,
  createProductsWorkflow,
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
  createServiceZonesWorkflow,
  createShippingOptionsWorkflow,
  createStockLocationsWorkflow,
  createTaxRegionsWorkflow,
  linkSalesChannelsToApiKeyWorkflow,
  updateStoresWorkflow,
  updateTaxRegionsWorkflow,
  createUserAccountWorkflow
} from '@medusajs/medusa/core-flows'

import { SELLER_MODULE } from '@mercurjs/b2c-core/modules/seller'
import {
  createConfigurationRuleWorkflow,
  createLocationFulfillmentSetAndAssociateWithSellerWorkflow,
  createSellerWorkflow
} from '@mercurjs/b2c-core/workflows'
import { createCommissionRuleWorkflow } from '@mercurjs/commission/workflows'
import {
  ConfigurationRuleDefaults,
  SELLER_SHIPPING_PROFILE_LINK
} from '@mercurjs/framework'

import { productCategoriesToInsert } from './seed-categories'
import { productsToInsert } from './seed-products-teniam'

const countries = ['be', 'de', 'dk', 'se', 'fr', 'es', 'it', 'pl', 'cz', 'nl']

export async function createAdminUser(container: MedusaContainer) {
  const authService = container.resolve(Modules.AUTH)
  const userService = container.resolve(Modules.USER)

  // Check if admin user already exists
  const [existingUser] = await userService.listUsers({
    email: 'admin@teniam.com'
  })

  if (existingUser) {
    return existingUser
  }

  // Create auth identity with password
  const { authIdentity } = await authService.register('emailpass', {
    body: {
      email: 'admin@teniam.com',
      password: 'supersecret'
    }
  })

  if (!authIdentity?.id) {
    throw new Error('Failed to create admin auth identity')
  }

  // Create admin user account
  const { result: user } = await createUserAccountWorkflow(container).run({
    input: {
      userData: {
        email: 'admin@teniam.com',
        first_name: 'Admin',
        last_name: 'User'
      },
      authIdentityId: authIdentity.id
    }
  })

  return user
}

export async function createSalesChannel(container: MedusaContainer) {
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL)
  let [defaultSalesChannel] = await salesChannelModuleService.listSalesChannels(
    {
      name: 'Default Sales Channel'
    }
  )

  if (!defaultSalesChannel) {
    const {
      result: [salesChannelResult]
    } = await createSalesChannelsWorkflow(container).run({
      input: {
        salesChannelsData: [
          {
            name: 'Default Sales Channel'
          }
        ]
      }
    })
    defaultSalesChannel = salesChannelResult
  }

  return defaultSalesChannel
}

export async function createStore(
  container: MedusaContainer,
  salesChannelId: string,
  regionId: string
) {
  const storeModuleService = container.resolve(Modules.STORE)
  const [store] = await storeModuleService.listStores()

  if (!store) {
    return
  }

  await updateStoresWorkflow(container).run({
    input: {
      selector: { id: store.id },
      update: {
        default_sales_channel_id: salesChannelId,
        default_region_id: regionId
      }
    }
  })
}
export async function createRegions(container: MedusaContainer) {
  const regionService = container.resolve(Modules.REGION)
  const existingRegions = await regionService.listRegions({})
  const existingRegion =
    existingRegions.find((r) => r.name === 'Europe') || existingRegions[0]

  if (existingRegion) {
    return existingRegion
  }

  try {
    const {
      result: [region]
    } = await createRegionsWorkflow(container).run({
      input: {
        regions: [
          {
            name: 'Europe',
            currency_code: 'eur',
            countries,
            payment_providers: ['pp_system_default']
          }
        ]
      }
    })

    const { result: taxRegions } = await createTaxRegionsWorkflow(
      container
    ).run({
      input: countries.map((country_code) => ({
        country_code
      }))
    })

    await updateTaxRegionsWorkflow(container).run({
      input: taxRegions.map((taxRegion) => ({
        id: taxRegion.id,
        provider_id: 'tp_system'
      }))
    })

    return region
  } catch (error) {
    const refreshedRegions = await regionService.listRegions({})
    const fallbackRegion =
      refreshedRegions.find((r) => r.name === 'Europe') || refreshedRegions[0]

    if (fallbackRegion) {
      return fallbackRegion
    }

    throw error
  }
}

export async function createPublishableKey(
  container: MedusaContainer,
  salesChannelId: string
) {
  const apiKeyService = container.resolve(Modules.API_KEY)

  let [key] = await apiKeyService.listApiKeys({ type: 'publishable' })

  if (!key) {
    const {
      result: [publishableApiKeyResult]
    } = await createApiKeysWorkflow(container).run({
      input: {
        api_keys: [
          {
            title: 'Default publishable key',
            type: 'publishable',
            created_by: ''
          }
        ]
      }
    })
    key = publishableApiKeyResult
  }

  await linkSalesChannelsToApiKeyWorkflow(container).run({
    input: {
      id: key.id,
      add: [salesChannelId]
    }
  })

  return key
}

export async function createProductCategories(container: MedusaContainer) {
  const productService = container.resolve(Modules.PRODUCT)
  const existingCategories = await productService.listProductCategories(
    {},
    { select: ['id', 'handle'] }
  )
  const existingByHandle = new Map(
    existingCategories.map((category) => [category.handle, category.id])
  )

  const parents = productCategoriesToInsert.filter((c) => !c.parent_handle)
  const children = productCategoriesToInsert.filter((c) => c.parent_handle)

  const parentsToCreate = parents.filter(
    (category) => !existingByHandle.has(category.handle)
  )
  let parentResult = existingCategories

  if (parentsToCreate.length) {
    const createdParents = await createProductCategoriesWorkflow(container).run({
      input: {
        product_categories: parentsToCreate.map((c) => ({
          name: c.name,
          handle: c.handle,
          description: c.description,
          is_active: c.is_active,
          metadata: c.metadata
        }))
      }
    })

    parentResult = [...parentResult, ...createdParents.result]
    createdParents.result.forEach((category) =>
      existingByHandle.set(category.handle, category.id)
    )
  }

  const parentByHandle = new Map(
    parentResult.map((category) => [category.handle, category.id])
  )

  const childPayload = children
    .map((c) => ({
      name: c.name,
      handle: c.handle,
      description: c.description,
      is_active: c.is_active,
      metadata: c.metadata,
      parent_category_id: parentByHandle.get(c.parent_handle!)
    }))
    .filter((c) => c.parent_category_id)
    .filter((c) => !existingByHandle.has(c.handle))

  if (childPayload.length) {
    try {
      await createProductCategoriesWorkflow(container).run({
        input: {
          product_categories: childPayload
        }
      })
    } catch (error) {
      const message =
        error && typeof error === 'object' && 'message' in error
          ? String((error as { message?: unknown }).message)
          : String(error)
      if (!message.includes('already exists')) {
        throw error
      }
    }
  }

  return parentResult
}

export async function createProductCollections(container: MedusaContainer) {
  const productService = container.resolve(Modules.PRODUCT)
  const existingCollections = await productService.listProductCollections(
    {},
    { select: ['title'] }
  )
  const existingTitles = new Set(
    existingCollections.map((collection) =>
      collection.title.toLowerCase()
    )
  )

  const collectionsToCreate = [
    { title: 'Luxury' },
    { title: 'Vintage' },
    { title: 'Casual' },
    { title: 'Soho' },
    { title: 'Streetwear' },
    { title: 'Y2K' }
  ].filter((collection) => !existingTitles.has(collection.title.toLowerCase()))

  if (!collectionsToCreate.length) {
    return existingCollections
  }

  const { result } = await createCollectionsWorkflow(container).run({
    input: {
      collections: collectionsToCreate
    }
  })

  return result
}

export async function createSeller(container: MedusaContainer) {
  const authService = container.resolve(Modules.AUTH)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  const { data: existingSellers } = await query.graph({
    entity: 'seller',
    fields: ['id', 'name', 'members.*'],
    filters: {
      members: { email: 'seller@mercurjs.com' }
    }
  })

  if (existingSellers?.length) {
    return existingSellers[0]
  }

  const { authIdentity } = await authService.register('emailpass', {
    body: {
      email: 'seller@mercurjs.com',
      password: 'secret'
    }
  })

  try {
    const { result: seller } = await createSellerWorkflow.run({
      container,
      input: {
        auth_identity_id: authIdentity?.id,
        member: {
          name: 'John Doe',
          email: 'seller@mercurjs.com'
        },
        seller: {
          name: 'MercurJS Store'
        }
      }
    })

    return seller
  } catch (error) {
    const { data: fallbackSellers } = await query.graph({
      entity: 'seller',
      fields: ['id', 'name', 'members.*'],
      filters: {
        members: { email: 'seller@mercurjs.com' }
      }
    })

    if (fallbackSellers?.length) {
      return fallbackSellers[0]
    }

    throw error
  }
}

export async function createSellerStockLocation(
  container: MedusaContainer,
  sellerId: string,
  salesChannelId: string
) {
  const link = container.resolve(ContainerRegistrationKeys.LINK)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  let stock

  try {
    const {
      result: [created]
    } = await createStockLocationsWorkflow(container).run({
      input: {
        locations: [
          {
            name: `Stock Location for seller ${sellerId}`,
            address: {
              address_1: 'Random Strasse',
              city: 'Berlin',
              country_code: 'de'
            }
          }
        ]
      }
    })
    stock = created
  } catch (error) {
    const { data } = await query.graph({
      entity: 'stock_location',
      fields: ['id', 'name'],
      filters: { name: `Stock Location for seller ${sellerId}` }
    })
    stock = data?.[0]
    if (!stock) {
      throw error
    }
  }

  try {
    await link.create([
      {
        [SELLER_MODULE]: {
          seller_id: sellerId
        },
        [Modules.STOCK_LOCATION]: {
          stock_location_id: stock.id
        }
      },
      {
        [Modules.STOCK_LOCATION]: {
          stock_location_id: stock.id
        },
        [Modules.FULFILLMENT]: {
          fulfillment_provider_id: 'manual_manual'
        }
      },
      {
        [Modules.SALES_CHANNEL]: {
          sales_channel_id: salesChannelId
        },
        [Modules.STOCK_LOCATION]: {
          stock_location_id: stock.id
        }
      }
    ])
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    if (!message.includes('already exists')) {
      throw error
    }
  }

  const fulfillmentSetName = `${sellerId} fulfillment set`
  const { data: existingFulfillmentSets } = await query.graph({
    entity: 'fulfillment_set',
    fields: ['id', 'name'],
    filters: {
      name: fulfillmentSetName
    }
  })

  if (!existingFulfillmentSets?.length) {
    try {
      await createLocationFulfillmentSetAndAssociateWithSellerWorkflow.run({
        container,
        input: {
          fulfillment_set_data: {
            name: fulfillmentSetName,
            type: 'shipping'
          },
          location_id: stock.id,
          seller_id: sellerId
        }
      })
    } catch (error) {
      const message =
        error && typeof error === 'object' && 'message' in error
          ? String((error as { message?: unknown }).message)
          : String(error)
      if (!message.includes('already exists')) {
        throw error
      }
    }
  }

  let {
    data: [stockLocation]
  } = await query.graph({
    entity: 'stock_location',
    fields: ['*', 'fulfillment_sets.*'],
    filters: {
      id: stock.id
    }
  })

  if (!stockLocation?.fulfillment_sets?.length) {
    try {
      await createLocationFulfillmentSetAndAssociateWithSellerWorkflow.run({
        container,
        input: {
          fulfillment_set_data: {
            name: fulfillmentSetName,
            type: 'shipping'
          },
          location_id: stock.id,
          seller_id: sellerId
        }
      })
    } catch (error) {
      const message =
        error && typeof error === 'object' && 'message' in error
          ? String((error as { message?: unknown }).message)
          : String(error)
      if (!message.includes('already exists')) {
        throw error
      }
    }

    const refresh = await query.graph({
      entity: 'stock_location',
      fields: ['*', 'fulfillment_sets.*'],
      filters: {
        id: stock.id
      }
    })
    stockLocation = refresh.data?.[0]
  }

  return stockLocation
}

export async function createServiceZoneForFulfillmentSet(
  container: MedusaContainer,
  sellerId: string,
  fulfillmentSetId: string
) {
  const fulfillmentService = container.resolve(Modules.FULFILLMENT)
  const existingZones = await fulfillmentService.listServiceZones({
    fulfillment_set: {
      id: fulfillmentSetId
    }
  })

  if (existingZones?.length) {
    return existingZones[0]
  }

  await createServiceZonesWorkflow.run({
    container,
    input: {
      data: [
        {
          fulfillment_set_id: fulfillmentSetId,
          name: `Europe`,
          geo_zones: countries.map((c) => ({
            type: 'country',
            country_code: c
          }))
        }
      ]
    }
  })

  const [zone] = await fulfillmentService.listServiceZones({
    fulfillment_set: {
      id: fulfillmentSetId
    }
  })

  const link = container.resolve(ContainerRegistrationKeys.LINK)
  try {
    await link.create({
      [SELLER_MODULE]: {
        seller_id: sellerId
      },
      [Modules.FULFILLMENT]: {
        service_zone_id: zone.id
      }
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    if (!message.includes('already exists')) {
      throw error
    }
  }

  return zone
}

export async function createSellerShippingOption(
  container: MedusaContainer,
  sellerId: string,
  sellerName: string,
  regionId: string,
  serviceZoneId: string
) {
  const shippingOptionService = container.resolve(Modules.FULFILLMENT)
  const existingOptions = await shippingOptionService.listShippingOptions({
    name: `${sellerName} shipping`,
    service_zone: { id: serviceZoneId }
  })

  if (existingOptions?.length) {
    return existingOptions[0]
  }

  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const {
    data: [shippingProfile]
  } = await query.graph({
    entity: SELLER_SHIPPING_PROFILE_LINK,
    fields: ['shipping_profile_id'],
    filters: {
      seller_id: sellerId
    }
  })

  const {
    result: [shippingOption]
  } = await createShippingOptionsWorkflow.run({
    container,
    input: [
      {
        name: `${sellerName} shipping`,
        shipping_profile_id: shippingProfile.shipping_profile_id,
        service_zone_id: serviceZoneId,
        provider_id: 'manual_manual',
        type: {
          label: `${sellerName} shipping`,
          code: sellerName,
          description: 'Europe shipping'
        },
        rules: [
          { value: 'true', attribute: 'enabled_in_store', operator: 'eq' },
          { attribute: 'is_return', value: 'false', operator: 'eq' }
        ],
        prices: [
          { currency_code: 'eur', amount: 10 },
          { amount: 10, region_id: regionId }
        ],
        price_type: 'flat',
        data: { id: 'manual-fulfillment' }
      }
    ]
  })

  const link = container.resolve(ContainerRegistrationKeys.LINK)
  try {
    await link.create({
      [SELLER_MODULE]: {
        seller_id: sellerId
      },
      [Modules.FULFILLMENT]: {
        shipping_option_id: shippingOption.id
      }
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    if (!message.includes('already exists')) {
      throw error
    }
  }

  return shippingOption
}

export async function createSellerProducts(
  container: MedusaContainer,
  sellerId: string,
  salesChannelId: string
) {
  const productService = container.resolve(Modules.PRODUCT)
  const existingProducts = await productService.listProducts(
    {},
    { select: ['id', 'handle'] }
  )
  const existingHandles = new Set(
    existingProducts.map((product) => product.handle)
  )
  const collections = await productService.listProductCollections(
    {},
    { select: ['id', 'title'] }
  )
  const categories = await productService.listProductCategories(
    {},
    { select: ['id', 'name', 'handle'] }
  )

  const randomCategory = () =>
    categories[Math.floor(Math.random() * categories.length)]
  const categoryByHandle = new Map(
    categories.map((category) => [category.handle, category.id])
  )
  const randomCollection = () =>
    collections[Math.floor(Math.random() * collections.length)]

  const toInsert = productsToInsert
    .filter((product) => !existingHandles.has(product.handle))
    .map((p) => {
    const categoryHandle = p?.metadata?.category_handle
    const categoryId = categoryHandle
      ? categoryByHandle.get(categoryHandle)
      : undefined

    return {
      ...p,
      categories: [
        {
          id: categoryId ?? randomCategory().id
        }
      ],
      collection_id: randomCollection().id,
      sales_channels: [
        {
          id: salesChannelId
        }
      ]
    }
  })

  if (!toInsert.length) {
    return existingProducts
  }

  const { result } = await createProductsWorkflow.run({
    container,
    input: {
      products: toInsert,
      additional_data: {
        seller_id: sellerId
      }
    }
  })

  return result
}

export async function createInventoryItemStockLevels(
  container: MedusaContainer,
  stockLocationId: string
) {
  const inventoryService = container.resolve(Modules.INVENTORY)
  const items = await inventoryService.listInventoryItems(
    {},
    { select: ['id'] }
  )

  const existingLevels = await inventoryService.listInventoryLevels({
    location_id: stockLocationId
  })
  const existingLevelIds = new Set(
    existingLevels.map((level) => level.inventory_item_id)
  )

  const toCreate = items
    .filter((i) => !existingLevelIds.has(i.id))
    .map((i) => ({
      inventory_item_id: i.id,
      location_id: stockLocationId,
      stocked_quantity: Math.floor(Math.random() * 50) + 1
    }))

  if (!toCreate.length) {
    return existingLevels
  }

  const { result } = await createInventoryLevelsWorkflow.run({
    container,
    input: {
      inventory_levels: toCreate
    }
  })
  return result
}

export async function createDefaultCommissionLevel(container: MedusaContainer) {
  try {
    await createCommissionRuleWorkflow.run({
      container,
      input: {
        name: 'default',
        is_active: true,
        reference: 'site',
        reference_id: '',
        rate: {
          include_tax: true,
          type: 'percentage',
          percentage_rate: 2
        }
      }
    })
  } catch (error) {
    const message =
      error && typeof error === 'object' && 'message' in error
        ? String((error as { message?: unknown }).message)
        : String(error)
    if (!message.toLowerCase().includes('already exists')) {
      throw error
    }
  }
}

export async function createConfigurationRules(container: MedusaContainer) {
  for (const [ruleType, isEnabled] of ConfigurationRuleDefaults) {
    try {
      await createConfigurationRuleWorkflow.run({
        container,
        input: {
          rule_type: ruleType,
          is_enabled: isEnabled
        }
      })
    } catch (error) {
      const message =
        error && typeof error === 'object' && 'message' in error
          ? String((error as { message?: unknown }).message)
          : String(error)
      if (
        message.includes('already exists') ||
        message.includes('rule_type')
      ) {
        continue
      }
      throw error
    }
  }
}
