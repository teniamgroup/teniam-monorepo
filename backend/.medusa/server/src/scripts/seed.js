"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = seedMarketplaceData;
const utils_1 = require("@medusajs/framework/utils");
const seed_functions_1 = require("./seed/seed-functions");
async function seedMarketplaceData({ container }) {
    const logger = container.resolve(utils_1.ContainerRegistrationKeys.LOGGER);
    logger.info("=== Configurations ===");
    logger.info("Creating admin user...");
    await (0, seed_functions_1.createAdminUser)(container);
    logger.info("Creating default sales channel...");
    const salesChannel = await (0, seed_functions_1.createSalesChannel)(container);
    logger.info("Creating default regions...");
    const region = await (0, seed_functions_1.createRegions)(container);
    logger.info("Creating publishable api key...");
    const apiKey = await (0, seed_functions_1.createPublishableKey)(container, salesChannel.id);
    logger.info("Creating store data...");
    await (0, seed_functions_1.createStore)(container, salesChannel.id, region.id);
    logger.info("Creating configuration rules...");
    await (0, seed_functions_1.createConfigurationRules)(container);
    logger.info("=== Example data ===");
    logger.info("Creating product categories...");
    await (0, seed_functions_1.createProductCategories)(container);
    logger.info("Creating product collections...");
    await (0, seed_functions_1.createProductCollections)(container);
    logger.info("Creating seller...");
    const seller = await (0, seed_functions_1.createSeller)(container);
    logger.info("Creating seller stock location...");
    const stockLocation = await (0, seed_functions_1.createSellerStockLocation)(container, seller.id, salesChannel.id);
    logger.info("Creating service zone...");
    const fulfillmentSetId = stockLocation.fulfillment_sets?.[0]?.id;
    if (!fulfillmentSetId) {
        throw new Error(`No fulfillment set found for stock location ${stockLocation.id}`);
    }
    const serviceZone = await (0, seed_functions_1.createServiceZoneForFulfillmentSet)(container, seller.id, fulfillmentSetId);
    logger.info("Creating seller shipping option...");
    await (0, seed_functions_1.createSellerShippingOption)(container, seller.id, seller.name, region.id, serviceZone.id);
    logger.info("Creating seller products...");
    await (0, seed_functions_1.createSellerProducts)(container, seller.id, salesChannel.id);
    logger.info("Creating inventory levels...");
    await (0, seed_functions_1.createInventoryItemStockLevels)(container, stockLocation.id);
    logger.info("Creating default commission...");
    await (0, seed_functions_1.createDefaultCommissionLevel)(container);
    logger.info("=== Finished ===");
    logger.info(`Publishable api key: ${apiKey.token}`);
    logger.info(`Admin panel access:`);
    logger.info(`email: admin@mercurjs.com`);
    logger.info(`pass: supersecret`);
    logger.info(`Vendor panel access:`);
    logger.info(`email: seller@mercurjs.com`);
    logger.info(`pass: secret`);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zY3JpcHRzL3NlZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFxQkEsc0NBaUVDO0FBckZELHFEQUFzRTtBQUV0RSwwREFnQitCO0FBRWhCLEtBQUssVUFBVSxtQkFBbUIsQ0FBQyxFQUFFLFNBQVMsRUFBWTtJQUN2RSxNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRW5FLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztJQUN0QyxNQUFNLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7SUFDdEMsTUFBTSxJQUFBLGdDQUFlLEVBQUMsU0FBUyxDQUFDLENBQUM7SUFDakMsTUFBTSxDQUFDLElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0lBQ2pELE1BQU0sWUFBWSxHQUFHLE1BQU0sSUFBQSxtQ0FBa0IsRUFBQyxTQUFTLENBQUMsQ0FBQztJQUN6RCxNQUFNLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUM7SUFDM0MsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFBLDhCQUFhLEVBQUMsU0FBUyxDQUFDLENBQUM7SUFDOUMsTUFBTSxDQUFDLElBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0lBQy9DLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBQSxxQ0FBb0IsRUFBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3RFLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztJQUN0QyxNQUFNLElBQUEsNEJBQVcsRUFBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDekQsTUFBTSxDQUFDLElBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0lBQy9DLE1BQU0sSUFBQSx5Q0FBd0IsRUFBQyxTQUFTLENBQUMsQ0FBQztJQUUxQyxNQUFNLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO0lBQzlDLE1BQU0sSUFBQSx3Q0FBdUIsRUFBQyxTQUFTLENBQUMsQ0FBQztJQUN6QyxNQUFNLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxDQUFDLENBQUM7SUFDL0MsTUFBTSxJQUFBLHlDQUF3QixFQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUNsQyxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUEsNkJBQVksRUFBQyxTQUFTLENBQUMsQ0FBQztJQUM3QyxNQUFNLENBQUMsSUFBSSxDQUFDLG1DQUFtQyxDQUFDLENBQUM7SUFDakQsTUFBTSxhQUFhLEdBQUcsTUFBTSxJQUFBLDBDQUF5QixFQUNuRCxTQUFTLEVBQ1QsTUFBTSxDQUFDLEVBQUUsRUFDVCxZQUFZLENBQUMsRUFBRSxDQUNoQixDQUFDO0lBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0lBQ3hDLE1BQU0sZ0JBQWdCLEdBQUcsYUFBYSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ2pFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3RCLE1BQU0sSUFBSSxLQUFLLENBQ2IsK0NBQStDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsQ0FDbEUsQ0FBQztJQUNKLENBQUM7SUFDRCxNQUFNLFdBQVcsR0FBRyxNQUFNLElBQUEsbURBQWtDLEVBQzFELFNBQVMsRUFDVCxNQUFNLENBQUMsRUFBRSxFQUNULGdCQUFnQixDQUNqQixDQUFDO0lBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO0lBQ2xELE1BQU0sSUFBQSwyQ0FBMEIsRUFDOUIsU0FBUyxFQUNULE1BQU0sQ0FBQyxFQUFFLEVBQ1QsTUFBTSxDQUFDLElBQUksRUFDWCxNQUFNLENBQUMsRUFBRSxFQUNULFdBQVcsQ0FBQyxFQUFFLENBQ2YsQ0FBQztJQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsNkJBQTZCLENBQUMsQ0FBQztJQUMzQyxNQUFNLElBQUEscUNBQW9CLEVBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUUsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2xFLE1BQU0sQ0FBQyxJQUFJLENBQUMsOEJBQThCLENBQUMsQ0FBQztJQUM1QyxNQUFNLElBQUEsK0NBQThCLEVBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNsRSxNQUFNLENBQUMsSUFBSSxDQUFDLGdDQUFnQyxDQUFDLENBQUM7SUFDOUMsTUFBTSxJQUFBLDZDQUE0QixFQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRTlDLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDLHdCQUF3QixNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUNwRCxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0lBQ3pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0lBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDOUIsQ0FBQyJ9