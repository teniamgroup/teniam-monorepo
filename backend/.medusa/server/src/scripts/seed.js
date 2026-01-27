"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = seedMarketplaceData;
const utils_1 = require("@medusajs/framework/utils");
const seed_functions_1 = require("./seed/seed-functions");
async function seedMarketplaceData({ container }) {
    const logger = container.resolve(utils_1.ContainerRegistrationKeys.LOGGER);
    const getErrorMessage = (error) => {
        if (error && typeof error === "object" && "message" in error) {
            return String(error.message);
        }
        return String(error);
    };
    const shouldSkipError = (message) => {
        const normalized = message.toLowerCase();
        return (normalized.includes("already exists") ||
            normalized.includes("already assigned to a region") ||
            normalized.includes("rule already exists") ||
            normalized.includes("no fulfillment set found"));
    };
    const runStep = async (label, fn) => {
        try {
            await fn();
        }
        catch (error) {
            const message = getErrorMessage(error);
            if (shouldSkipError(message)) {
                logger.warn(`${label} skipped: ${message}`);
                return;
            }
            throw error;
        }
    };
    logger.info("=== Configurations ===");
    logger.info("Creating admin user...");
    await runStep("Create admin user", () => (0, seed_functions_1.createAdminUser)(container).then());
    logger.info("Creating default sales channel...");
    const salesChannel = await (0, seed_functions_1.createSalesChannel)(container);
    logger.info("Creating default regions...");
    const region = await (0, seed_functions_1.createRegions)(container);
    logger.info("Creating publishable api key...");
    const apiKey = await (0, seed_functions_1.createPublishableKey)(container, salesChannel.id);
    logger.info("Creating store data...");
    await runStep("Create store data", () => (0, seed_functions_1.createStore)(container, salesChannel.id, region.id).then());
    logger.info("Creating configuration rules...");
    await runStep("Create configuration rules", () => (0, seed_functions_1.createConfigurationRules)(container).then());
    logger.info("=== Example data ===");
    logger.info("Creating product categories...");
    await runStep("Create product categories", () => (0, seed_functions_1.createProductCategories)(container).then());
    logger.info("Creating product collections...");
    await runStep("Create product collections", () => (0, seed_functions_1.createProductCollections)(container).then());
    logger.info("Creating seller...");
    const seller = await (0, seed_functions_1.createSeller)(container);
    logger.info("Creating seller stock location...");
    const stockLocation = await (0, seed_functions_1.createSellerStockLocation)(container, seller.id, salesChannel.id);
    logger.info("Creating service zone...");
    const fulfillmentSetId = stockLocation.fulfillment_sets?.[0]?.id;
    if (!fulfillmentSetId) {
        logger.warn(`No fulfillment set found for stock location ${stockLocation.id}. Skipping service zone/shipping setup.`);
        logger.info("Creating seller products...");
        await runStep("Create seller products", () => (0, seed_functions_1.createSellerProducts)(container, seller.id, salesChannel.id).then());
        logger.info("Creating inventory levels...");
        await runStep("Create inventory levels", () => (0, seed_functions_1.createInventoryItemStockLevels)(container, stockLocation.id).then());
        logger.info("Creating default commission...");
        await runStep("Create default commission", () => (0, seed_functions_1.createDefaultCommissionLevel)(container).then());
        return;
    }
    const serviceZone = await (0, seed_functions_1.createServiceZoneForFulfillmentSet)(container, seller.id, fulfillmentSetId);
    logger.info("Creating seller shipping option...");
    await runStep("Create seller shipping option", () => (0, seed_functions_1.createSellerShippingOption)(container, seller.id, seller.name, region.id, serviceZone.id).then());
    logger.info("Creating seller products...");
    await runStep("Create seller products", () => (0, seed_functions_1.createSellerProducts)(container, seller.id, salesChannel.id).then());
    logger.info("Creating inventory levels...");
    await runStep("Create inventory levels", () => (0, seed_functions_1.createInventoryItemStockLevels)(container, stockLocation.id).then());
    logger.info("Creating default commission...");
    await runStep("Create default commission", () => (0, seed_functions_1.createDefaultCommissionLevel)(container).then());
    logger.info("=== Finished ===");
    logger.info(`Publishable api key: ${apiKey.token}`);
    logger.info(`Admin panel access:`);
    logger.info(`email: admin@teniam.com`);
    logger.info(`pass: supersecret`);
    logger.info(`Vendor panel access:`);
    logger.info(`email: seller@mercurjs.com`);
    logger.info(`pass: secret`);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zY3JpcHRzL3NlZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFxQkEsc0NBNEhDO0FBaEpELHFEQUFzRTtBQUV0RSwwREFnQitCO0FBRWhCLEtBQUssVUFBVSxtQkFBbUIsQ0FBQyxFQUFFLFNBQVMsRUFBWTtJQUN2RSxNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRW5FLE1BQU0sZUFBZSxHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDekMsSUFBSSxLQUFLLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLFNBQVMsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUM3RCxPQUFPLE1BQU0sQ0FBRSxLQUErQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFELENBQUM7UUFDRCxPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QixDQUFDLENBQUM7SUFFRixNQUFNLGVBQWUsR0FBRyxDQUFDLE9BQWUsRUFBRSxFQUFFO1FBQzFDLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN6QyxPQUFPLENBQ0wsVUFBVSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQztZQUNyQyxVQUFVLENBQUMsUUFBUSxDQUFDLDhCQUE4QixDQUFDO1lBQ25ELFVBQVUsQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUM7WUFDMUMsVUFBVSxDQUFDLFFBQVEsQ0FBQywwQkFBMEIsQ0FBQyxDQUNoRCxDQUFDO0lBQ0osQ0FBQyxDQUFDO0lBRUYsTUFBTSxPQUFPLEdBQUcsS0FBSyxFQUFFLEtBQWEsRUFBRSxFQUF1QixFQUFFLEVBQUU7UUFDL0QsSUFBSSxDQUFDO1lBQ0gsTUFBTSxFQUFFLEVBQUUsQ0FBQztRQUNiLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2Ys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