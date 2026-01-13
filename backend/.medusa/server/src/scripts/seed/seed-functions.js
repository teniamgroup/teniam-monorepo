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
const seed_products_1 = require("./seed-products");
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
    const { result } = await (0, core_flows_1.createProductCategoriesWorkflow)(container).run({
        input: {
            product_categories: [
                {
                    name: 'Sneakers',
                    is_active: true
                },
                {
                    name: 'Sandals',
                    is_active: true
                },
                {
                    name: 'Boots',
                    is_active: true
                },
                {
                    name: 'Sport',
                    is_active: true
                },
                {
                    name: 'Accessories',
                    is_active: true
                },
                {
                    name: 'Tops',
                    is_active: true
                }
            ]
        }
    });
    return result;
}
async function createProductCollections(container) {
    const { result } = await (0, core_flows_1.createCollectionsWorkflow)(container).run({
        input: {
            collections: [
                {
                    title: 'Luxury'
                },
                {
                    title: 'Vintage'
                },
                {
                    title: 'Casual'
                },
                {
                    title: 'Soho'
                },
                {
                    title: 'Streetwear'
                },
                {
                    title: 'Y2K'
                }
            ]
        }
    });
    return result;
}
async function createSeller(container) {
    const authService = container.resolve(utils_1.Modules.AUTH);
    const { authIdentity } = await authService.register('emailpass', {
        body: {
            email: 'seller@mercurjs.com',
            password: 'secret'
        }
    });
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
async function createSellerStockLocation(container, sellerId, salesChannelId) {
    const link = container.resolve(utils_1.ContainerRegistrationKeys.LINK);
    const { result: [stock] } = await (0, core_flows_1.createStockLocationsWorkflow)(container).run({
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
    await workflows_1.createLocationFulfillmentSetAndAssociateWithSellerWorkflow.run({
        container,
        input: {
            fulfillment_set_data: {
                name: `${sellerId} fulfillment set`,
                type: 'shipping'
            },
            location_id: stock.id,
            seller_id: sellerId
        }
    });
    const query = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { data: [stockLocation] } = await query.graph({
        entity: 'stock_location',
        fields: ['*', 'fulfillment_sets.*'],
        filters: {
            id: stock.id
        }
    });
    return stockLocation;
}
async function createServiceZoneForFulfillmentSet(container, sellerId, fulfillmentSetId) {
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
    const fulfillmentService = container.resolve(utils_1.Modules.FULFILLMENT);
    const [zone] = await fulfillmentService.listServiceZones({
        fulfillment_set: {
            id: fulfillmentSetId
        }
    });
    const link = container.resolve(utils_1.ContainerRegistrationKeys.LINK);
    await link.create({
        [seller_1.SELLER_MODULE]: {
            seller_id: sellerId
        },
        [utils_1.Modules.FULFILLMENT]: {
            service_zone_id: zone.id
        }
    });
    return zone;
}
async function createSellerShippingOption(container, sellerId, sellerName, regionId, serviceZoneId) {
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
    await link.create({
        [seller_1.SELLER_MODULE]: {
            seller_id: sellerId
        },
        [utils_1.Modules.FULFILLMENT]: {
            shipping_option_id: shippingOption.id
        }
    });
    return shippingOption;
}
async function createSellerProducts(container, sellerId, salesChannelId) {
    const productService = container.resolve(utils_1.Modules.PRODUCT);
    const collections = await productService.listProductCollections({}, { select: ['id', 'title'] });
    const categories = await productService.listProductCategories({}, { select: ['id', 'name'] });
    const randomCategory = () => categories[Math.floor(Math.random() * categories.length)];
    const randomCollection = () => collections[Math.floor(Math.random() * collections.length)];
    const toInsert = seed_products_1.productsToInsert.map((p) => ({
        ...p,
        categories: [
            {
                id: randomCategory().id
            }
        ],
        collection_id: randomCollection().id,
        sales_channels: [
            {
                id: salesChannelId
            }
        ]
    }));
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
    const toCreate = items.map((i) => ({
        inventory_item_id: i.id,
        location_id: stockLocationId,
        stocked_quantity: Math.floor(Math.random() * 50) + 1
    }));
    const { result } = await core_flows_1.createInventoryLevelsWorkflow.run({
        container,
        input: {
            inventory_levels: toCreate
        }
    });
    return result;
}
async function createDefaultCommissionLevel(container) {
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
async function createConfigurationRules(container) {
    for (const [ruleType, isEnabled] of framework_1.ConfigurationRuleDefaults) {
        await workflows_1.createConfigurationRuleWorkflow.run({
            container,
            input: {
                rule_type: ruleType,
                is_enabled: isEnabled
            }
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VlZC1mdW5jdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvc2NyaXB0cy9zZWVkL3NlZWQtZnVuY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBb0NBLDBDQXNDQztBQUVELGdEQXdCQztBQUVELGtDQXFCQztBQUNELHNDQThCQztBQUVELG9EQWlDQztBQUVELDBEQWlDQztBQUVELDREQTJCQztBQUVELG9DQXlCQztBQUVELDhEQTJFQztBQUVELGdGQXdDQztBQUVELGdFQTBEQztBQUVELG9EQThDQztBQUVELHdFQXVCQztBQUVELG9FQWVDO0FBRUQsNERBVUM7QUFoakJELHFEQUE4RTtBQUM5RSw0REFnQm9DO0FBRXBDLDhEQUFpRTtBQUNqRSw0REFJcUM7QUFDckMsOERBQTZFO0FBQzdFLG1EQUc0QjtBQUU1QixtREFBa0Q7QUFFbEQsTUFBTSxTQUFTLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtBQUV2RSxLQUFLLFVBQVUsZUFBZSxDQUFDLFNBQTBCO0lBQzlELE1BQU0sV0FBVyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsZUFBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ25ELE1BQU0sV0FBVyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsZUFBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBRW5ELHFDQUFxQztJQUNyQyxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsTUFBTSxXQUFXLENBQUMsU0FBUyxDQUFDO1FBQ2pELEtBQUssRUFBRSxrQkFBa0I7S0FDMUIsQ0FBQyxDQUFBO0lBRUYsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNqQixPQUFPLFlBQVksQ0FBQTtJQUNyQixDQUFDO0lBRUQscUNBQXFDO0lBQ3JDLE1BQU0s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