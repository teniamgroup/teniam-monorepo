"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdminUser = createAdminUser;
exports.createSalesChannel = createSalesChannel;
exports.createStore = createStore;
exports.createRegions = createRegions;
exports.createPublishableKey = createPublishableKey;
exports.createProductCategories = createProductCategories;
exports.createProductCollections = createProductCollections;
exports.createSeller = createSeller;
exports.createSellerStockLocation = createSellerStockLocation;
exports.createServiceZoneForFulfillmentSet = createServiceZoneForFulfillmentSet;
exports.createSellerShippingOption = createSellerShippingOption;
exports.createSellerProducts = createSellerProducts;
exports.createInventoryItemStockLevels = createInventoryItemStockLevels;
exports.createDefaultCommissionLevel = createDefaultCommissionLevel;
exports.createConfigurationRules = createConfigurationRules;
const utils_1 = require("@medusajs/framework/utils");
const core_flows_1 = require("@medusajs/medusa/core-flows");
const seller_1 = require("@mercurjs/b2c-core/modules/seller");
const workflows_1 = require("@mercurjs/b2c-core/workflows");
const workflows_2 = require("@mercurjs/commission/workflows");
const framework_1 = require("@mercurjs/framework");
const seed_categories_1 = require("./seed-categories");
const seed_products_teniam_1 = require("./seed-products-teniam");
const countries = ['be', 'de', 'dk', 'se', 'fr', 'es', 'it', 'pl', 'cz', 'nl'];
async function createAdminUser(container) {
    const authService = container.resolve(utils_1.Modules.AUTH);
    const userService = container.resolve(utils_1.Modules.USER);
    // Check if admin user already exists
    const [existingUser] = await userService.listUsers({
        email: 'admin@teniam.com'
    });
    if (existingUser) {
        return existingUser;
    }
    // Create auth identity with password
    const { authIdentity } = await authService.register('emailpass', {
        body: {
            email: 'admin@teniam.com',
            password: 'supersecret'
        }
    });
    if (!authIdentity?.id) {
        throw new Error('Failed to create admin auth identity');
    }
    // Create admin user account
    const { result: user } = await (0, core_flows_1.createUserAccountWorkflow)(container).run({
        input: {
            userData: {
                email: 'admin@teniam.com',
                first_name: 'Admin',
                last_name: 'User'
            },
            authIdentityId: authIdentity.id
        }
    });
    return user;
}
async function createSalesChannel(container) {
    const salesChannelModuleService = container.resolve(utils_1.Modules.SALES_CHANNEL);
    let [defaultSalesChannel] = await salesChannelModuleService.listSalesChannels({
        name: 'Default Sales Channel'
    });
    if (!defaultSalesChannel) {
        const { result: [salesChannelResult] } = await (0, core_flows_1.createSalesChannelsWorkflow)(container).run({
            input: {
                salesChannelsData: [
                    {
                        name: 'Default Sales Channel'
                    }
                ]
            }
        });
        defaultSalesChannel = salesChannelResult;
    }
    return defaultSalesChannel;
}
async function createStore(container, salesChannelId, regionId) {
    const storeModuleService = container.resolve(utils_1.Modules.STORE);
    const [store] = await storeModuleService.listStores();
    if (!store) {
        return;
    }
    await (0, core_flows_1.updateStoresWorkflow)(container).run({
        input: {
            selector: { id: store.id },
            update: {
                default_sales_channel_id: salesChannelId,
                default_region_id: regionId
            }
        }
    });
}
async function createRegions(container) {
    const regionService = container.resolve(utils_1.Modules.REGION);
    const existingRegions = await regionService.listRegions({});
    const existingRegion = existingRegions.find((r) => r.name === 'Europe') || existingRegions[0];
    if (existingRegion) {
        return existingRegion;
    }
    try {
        const { result: [region] } = await (0, core_flows_1.createRegionsWorkflow)(container).run({
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
        });
        const { result: taxRegions } = await (0, core_flows_1.createTaxRegionsWorkflow)(container).run({
            input: countries.map((country_code) => ({
                country_code
            }))
        });
        await (0, core_flows_1.updateTaxRegionsWorkflow)(container).run({
            input: taxRegions.map((taxRegion) => ({
                id: taxRegion.id,
                provider_id: 'tp_system'
            }))
        });
        return region;
    }
    catch (error) {
        const refreshedRegions = await regionService.listRegions({});
        const fallbackRegion = refreshedRegions.find((r) => r.name === 'Europe') || refreshedRegions[0];
        if (fallbackRegion) {
            return fallbackRegion;
        }
        throw error;
    }
}
async function createPublishableKey(container, salesChannelId) {
    const apiKeyService = container.resolve(utils_1.Modules.API_KEY);
    let [key] = await apiKeyService.listApiKeys({ type: 'publishable' });
    if (!key) {
        const { result: [publishableApiKeyResult] } = await (0, core_flows_1.createApiKeysWorkflow)(container).run({
            input: {
                api_keys: [
                    {
                        title: 'Default publishable key',
                        type: 'publishable',
                        created_by: ''
                    }
                ]
            }
        });
        key = publishableApiKeyResult;
    }
    await (0, core_flows_1.linkSalesChannelsToApiKeyWorkflow)(container).run({
        input: {
            id: key.id,
            add: [salesChannelId]
        }
    });
    return key;
}
async function createProductCategories(container) {
    const productService = container.resolve(utils_1.Modules.PRODUCT);
    const existingCategories = await productService.listProductCategories({}, { select: ['id', 'handle'] });
    const existingByHandle = new Map(existingCategories.map((category) => [category.handle, category.id]));
    const parents = seed_categories_1.productCategoriesToInsert.filter((c) => !c.parent_handle);
    const children = seed_categories_1.productCategoriesToInsert.filter((c) => c.parent_handle);
    const parentsToCreate = parents.filter((category) => !existingByHandle.has(category.handle));
    let parentResult = existingCategories;
    if (parentsToCreate.length) {
        const createdParents = await (0, core_flows_1.createProductCategoriesWorkflow)(container).run({
            input: {
                product_categories: parentsToCreate.map((c) => ({
                    name: c.name,
                    handle: c.handle,
                    description: c.description,
                    is_active: c.is_active,
                    metadata: c.metadata
                }))
            }
        });
        parentResult = [...parentResult, ...createdParents.result];
        createdParents.result.forEach((category) => existingByHandle.set(category.handle, category.id));
    }
    const parentByHandle = new Map(parentResult.map((category) => [category.handle, category.id]));
    const childPayload = children
        .map((c) => ({
        name: c.name,
        handle: c.handle,
        description: c.description,
        is_active: c.is_active,
        metadata: c.metadata,
        parent_category_id: parentByHandle.get(c.parent_handle)
    }))
        .filter((c) => c.parent_category_id)
        .filter((c) => !existingByHandle.has(c.handle));
    if (childPayload.length) {
        try {
            await (0, core_flows_1.createProductCategoriesWorkflow)(container).run({
                input: {
                    product_categories: childPayload
                }
            });
        }
        catch (error) {
            const message = error && typeof error === 'object' && 'message' in error
                ? String(error.message)
                : String(error);
            if (!message.includes('already exists')) {
                throw error;
            }
        }
    }
    return parentResult;
}
async function createProductCollections(container) {
    const productService = container.resolve(utils_1.Modules.PRODUCT);
    const existingCollections = await productService.listProductCollections({}, { select: ['title'] });
    const existingTitles = new Set(existingCollections.map((collection) => collection.title.toLowerCase()));
    const collectionsToCreate = [
        { title: 'Luxury' },
        { title: 'Vintage' },
        { title: 'Casual' },
        { title: 'Soho' },
        { title: 'Streetwear' },
        { title: 'Y2K' }
    ].filter((collection) => !existingTitles.has(collection.title.toLowerCase()));
    if (!collectionsToCreate.length) {
        return existingCollections;
    }
    const { result } = await (0, core_flows_1.createCollectionsWorkflow)(container).run({
        input: {
            collections: collectionsToCreate
        }
    });
    return result;
}
async function createSeller(container) {
    const authService = container.resolve(utils_1.Modules.AUTH);
    const query = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { data: existingSellers } = await query.graph({
        entity: 'seller',
        fields: ['id', 'name', 'members.*'],
        filters: {
            members: { email: 'seller@mercurjs.com' }
        }
    });
    if (existingSellers?.length) {
        return existingSellers[0];
    }
    const { authIdentity } = await authService.register('emailpass', {
        body: {
            email: 'seller@mercurjs.com',
            password: 'secret'
        }
    });
    try {
        const { result: seller } = await workflows_1.createSellerWorkflow.run({
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
        });
        return seller;
    }
    catch (error) {
        const { data: fallbackSellers } = await query.graph({
            entity: 'seller',
            fields: ['id', 'name', 'members.*'],
            filters: {
                members: { email: 'seller@mercurjs.com' }
            }
        });
        if (fallbackSellers?.length) {
            return fallbackSellers[0];
        }
        throw error;
    }
}
async function createSellerStockLocation(container, sellerId, salesChannelId) {
    const link = container.resolve(utils_1.ContainerRegistrationKeys.LINK);
    const query = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    let stock;
    try {
        const { result: [created] } = await (0, core_flows_1.createStockLocationsWorkflow)(container).run({
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
        });
        stock = created;
    }
    catch (error) {
        const { data } = await query.graph({
            entity: 'stock_location',
            fields: ['id', 'name'],
            filters: { name: `Stock Location for seller ${sellerId}` }
        });
        stock = data?.[0];
        if (!stock) {
            throw error;
        }
    }
    try {
        await link.create([
            {
                [seller_1.SELLER_MODULE]: {
                    seller_id: sellerId
                },
                [utils_1.Modules.STOCK_LOCATION]: {
                    stock_location_id: stock.id
                }
            },
            {
                [utils_1.Modules.STOCK_LOCATION]: {
                    stock_location_id: stock.id
                },
                [utils_1.Modules.FULFILLMENT]: {
                    fulfillment_provider_id: 'manual_manual'
                }
            },
            {
                [utils_1.Modules.SALES_CHANNEL]: {
                    sales_channel_id: salesChannelId
                },
                [utils_1.Modules.STOCK_LOCATION]: {
                    stock_location_id: stock.id
                }
            }
        ]);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        if (!message.includes('already exists')) {
            throw error;
        }
    }
    const fulfillmentSetName = `${sellerId} fulfillment set`;
    // Create fulfillment set and associate with seller
    try {
        await workflows_1.createLocationFulfillmentSetAndAssociateWithSellerWorkflow.run({
            container,
            input: {
                fulfillment_set_data: {
                    name: fulfillmentSetName,
                    type: 'shipping'
                },
                location_id: stock.id,
                seller_id: sellerId
            }
        });
    }
    catch (error) {
        const message = error && typeof error === 'object' && 'message' in error
            ? String(error.message)
            : String(error);
        if (!message.includes('already exists')) {
            throw error;
        }
    }
    // Wait a bit and then query for the stock location with fulfillment sets
    // This ensures the fulfillment set is properly associated
    await new Promise(resolve => setTimeout(resolve, 1000));
    let { data: [stockLocation] } = await query.graph({
        entity: 'stock_location',
        fields: ['*', 'fulfillment_sets.*'],
        filters: {
            id: stock.id
        }
    });
    // If still no fulfillment sets, try to refresh once more
    if (!stockLocation?.fulfillment_sets?.length) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const refresh = await query.graph({
            entity: 'stock_location',
            fields: ['*', 'fulfillment_sets.*'],
            filters: {
                id: stock.id
            }
        });
        stockLocation = refresh.data?.[0];
    }
    // If still no fulfillment sets after all attempts, log a warning but continue
    if (!stockLocation?.fulfillment_sets?.length) {
        console.warn(`Warning: No fulfillment sets found for stock location ${stock.id} after all attempts`);
    }
    // Refresh the stock location data
    const refresh = await query.graph({
        entity: 'stock_location',
        fields: ['*', 'fulfillment_sets.*'],
        filters: {
            id: stock.id
        }
    });
    stockLocation = refresh.data?.[0];
    return stockLocation;
}
async function createServiceZoneForFulfillmentSet(container, sellerId, fulfillmentSetId) {
    const fulfillmentService = container.resolve(utils_1.Modules.FULFILLMENT);
    const existingZones = await fulfillmentService.listServiceZones({
        fulfillment_set: {
            id: fulfillmentSetId
        }
    });
    if (existingZones?.length) {
        return existingZones[0];
    }
    await core_flows_1.createServiceZonesWorkflow.run({
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
    });
    const [zone] = await fulfillmentService.listServiceZones({
        fulfillment_set: {
            id: fulfillmentSetId
        }
    });
    const link = container.resolve(utils_1.ContainerRegistrationKeys.LINK);
    try {
        await link.create({
            [seller_1.SELLER_MODULE]: {
                seller_id: sellerId
            },
            [utils_1.Modules.FULFILLMENT]: {
                service_zone_id: zone.id
            }
        });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        if (!message.includes('already exists')) {
            throw error;
        }
    }
    return zone;
}
async function createSellerShippingOption(container, sellerId, sellerName, regionId, serviceZoneId) {
    const shippingOptionService = container.resolve(utils_1.Modules.FULFILLMENT);
    const existingOptions = await shippingOptionService.listShippingOptions({
        name: `${sellerName} shipping`,
        service_zone: { id: serviceZoneId }
    });
    if (existingOptions?.length) {
        return existingOptions[0];
    }
    const query = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { data: [shippingProfile] } = await query.graph({
        entity: framework_1.SELLER_SHIPPING_PROFILE_LINK,
        fields: ['shipping_profile_id'],
        filters: {
            seller_id: sellerId
        }
    });
    const { result: [shippingOption] } = await core_flows_1.createShippingOptionsWorkflow.run({
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
    });
    const link = container.resolve(utils_1.ContainerRegistrationKeys.LINK);
    try {
        await link.create({
            [seller_1.SELLER_MODULE]: {
                seller_id: sellerId
            },
            [utils_1.Modules.FULFILLMENT]: {
                shipping_option_id: shippingOption.id
            }
        });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        if (!message.includes('already exists')) {
            throw error;
        }
    }
    return shippingOption;
}
async function createSellerProducts(container, sellerId, salesChannelId) {
    const productService = container.resolve(utils_1.Modules.PRODUCT);
    const existingProducts = await productService.listProducts({}, { select: ['id', 'handle'] });
    const existingHandles = new Set(existingProducts.map((product) => product.handle));
    const collections = await productService.listProductCollections({}, { select: ['id', 'title'] });
    const categories = await productService.listProductCategories({}, { select: ['id', 'name', 'handle'] });
    const randomCategory = () => categories[Math.floor(Math.random() * categories.length)];
    const categoryByHandle = new Map(categories.map((category) => [category.handle, category.id]));
    const randomCollection = () => collections[Math.floor(Math.random() * collections.length)];
    const toInsert = seed_products_teniam_1.productsToInsert
        .filter((product) => !existingHandles.has(product.handle))
        .map((p) => {
        const categoryHandle = p?.metadata?.category_handle;
        const categoryId = categoryHandle
            ? categoryByHandle.get(categoryHandle)
            : undefined;
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
        };
    });
    if (!toInsert.length) {
        return existingProducts;
    }
    const { result } = await core_flows_1.createProductsWorkflow.run({
        container,
        input: {
            products: toInsert,
            additional_data: {
                seller_id: sellerId
            }
        }
    });
    return result;
}
async function createInventoryItemStockLevels(container, stockLocationId) {
    const inventoryService = container.resolve(utils_1.Modules.INVENTORY);
    const items = await inventoryService.listInventoryItems({}, { select: ['id'] });
    const existingLevels = await inventoryService.listInventoryLevels({
        location_id: stockLocationId
    });
    const existingLevelIds = new Set(existingLevels.map((level) => level.inventory_item_id));
    const toCreate = items
        .filter((i) => !existingLevelIds.has(i.id))
        .map((i) => ({
        inventory_item_id: i.id,
        location_id: stockLocationId,
        stocked_quantity: Math.floor(Math.random() * 50) + 1
    }));
    if (!toCreate.length) {
        return existingLevels;
    }
    const { result } = await core_flows_1.createInventoryLevelsWorkflow.run({
        container,
        input: {
            inventory_levels: toCreate
        }
    });
    return result;
}
async function createDefaultCommissionLevel(container) {
    try {
        await workflows_2.createCommissionRuleWorkflow.run({
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
        });
    }
    catch (error) {
        const message = error && typeof error === 'object' && 'message' in error
            ? String(error.message)
            : String(error);
        if (!message.toLowerCase().includes('already exists')) {
            throw error;
        }
    }
}
async function createConfigurationRules(container) {
    for (const [ruleType, isEnabled] of framework_1.ConfigurationRuleDefaults) {
        try {
            await workflows_1.createConfigurationRuleWorkflow.run({
                container,
                input: {
                    rule_type: ruleType,
                    is_enabled: isEnabled
                }
            });
        }
        catch (error) {
            const message = error && typeof error === 'object' && 'message' in error
                ? String(error.message)
                : String(error);
            if (message.includes('already exists') ||
                message.includes('rule_type')) {
                continue;
            }
            throw error;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VlZC1mdW5jdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvc2NyaXB0cy9zZWVkL3NlZWQtZnVuY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBcUNBLDBDQXNDQztBQUVELGdEQXdCQztBQUVELGtDQXFCQztBQUNELHNDQXFEQztBQUVELG9EQWlDQztBQUVELDBEQXdFQztBQUVELDREQWdDQztBQUVELG9DQXNEQztBQUVELDhEQThJQztBQUVELGdGQXdEQztBQUVELGdFQTJFQztBQUVELG9EQXFFQztBQUVELHdFQW9DQztBQUVELG9FQXlCQztBQUVELDREQXdCQztBQWp6QkQscURBQThFO0FBQzlFLDREQWdCb0M7QUFFcEMsOERBQWlFO0FBQ2pFLDREQUlxQztBQUNyQyw4REFBNkU7QUFDN0UsbURBRzRCO0FBRTVCLHVEQUE2RDtBQUM3RCxpRUFBeUQ7QUFFekQsTUFBTSxTQUFTLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtBQUV2RSxLQUFLLFVBQVUsZUFBZSxDQUFDLFNBQTBCO0lBQzlELE1BQU0sV0FBVyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsZUFBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ25ELE1BQU0sV0FBVyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsZUFBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBRW5ELHFDQUFxQztJQUNyQyxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsTUFBTSxXQUFXLENBQUMsU0FBUyxDQUFDO1FBQ2pELEtBQUssRUFBRSxrQkFBa0I7S0FDMUIsQ0FBQyxDQUFBO0lBRUYsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNqQixPQUFPLFlBQVksQ0FBQTtJQUNyQixDQUFDO0lBRUQscUNB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