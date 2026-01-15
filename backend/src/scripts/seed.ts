import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";

import {
  createAdminUser,
  createConfigurationRules,
  createDefaultCommissionLevel,
  createInventoryItemStockLevels,
  createProductCategories,
  createProductCollections,
  createPublishableKey,
  createRegions,
  createSalesChannel,
  createSeller,
  createSellerProducts,
  createSellerShippingOption,
  createSellerStockLocation,
  createServiceZoneForFulfillmentSet,
  createStore,
} from "./seed/seed-functions";

export default async function seedMarketplaceData({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);

  const getErrorMessage = (error: unknown) => {
    if (error && typeof error === "object" && "message" in error) {
      return String((error as { message?: unknown }).message);
    }
    return String(error);
  };

  const shouldSkipError = (message: string) => {
    const normalized = message.toLowerCase();
    return (
      normalized.includes("already exists") ||
      normalized.includes("already assigned to a region") ||
      normalized.includes("rule already exists") ||
      normalized.includes("no fulfillment set found")
    );
  };

  const runStep = async (label: string, fn: () => Promise<void>) => {
    try {
      await fn();
    } catch (error) {
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
  await runStep("Create admin user", () => createAdminUser(container).then());
  logger.info("Creating default sales channel...");
  const salesChannel = await createSalesChannel(container);
  logger.info("Creating default regions...");
  const region = await createRegions(container);
  logger.info("Creating publishable api key...");
  const apiKey = await createPublishableKey(container, salesChannel.id);
  logger.info("Creating store data...");
  await runStep("Create store data", () =>
    createStore(container, salesChannel.id, region.id).then()
  );
  logger.info("Creating configuration rules...");
  await runStep("Create configuration rules", () =>
    createConfigurationRules(container).then()
  );

  logger.info("=== Example data ===");
  logger.info("Creating product categories...");
  await runStep("Create product categories", () =>
    createProductCategories(container).then()
  );
  logger.info("Creating product collections...");
  await runStep("Create product collections", () =>
    createProductCollections(container).then()
  );
  logger.info("Creating seller...");
  const seller = await createSeller(container);
  logger.info("Creating seller stock location...");
  const stockLocation = await createSellerStockLocation(
    container,
    seller.id,
    salesChannel.id
  );
  logger.info("Creating service zone...");
  const fulfillmentSetId = stockLocation.fulfillment_sets?.[0]?.id;
  if (!fulfillmentSetId) {
    logger.warn(
      `No fulfillment set found for stock location ${stockLocation.id}. Skipping service zone/shipping setup.`
    );
    logger.info("Creating seller products...");
    await runStep("Create seller products", () =>
      createSellerProducts(container, seller.id, salesChannel.id).then()
    );
    logger.info("Creating inventory levels...");
    await runStep("Create inventory levels", () =>
      createInventoryItemStockLevels(container, stockLocation.id).then()
    );
    logger.info("Creating default commission...");
    await runStep("Create default commission", () =>
      createDefaultCommissionLevel(container).then()
    );
    return;
  }
  const serviceZone = await createServiceZoneForFulfillmentSet(
    container,
    seller.id,
    fulfillmentSetId
  );
  logger.info("Creating seller shipping option...");
  await runStep("Create seller shipping option", () =>
    createSellerShippingOption(
      container,
      seller.id,
      seller.name,
      region.id,
      serviceZone.id
    ).then()
  );
  logger.info("Creating seller products...");
  await runStep("Create seller products", () =>
    createSellerProducts(container, seller.id, salesChannel.id).then()
  );
  logger.info("Creating inventory levels...");
  await runStep("Create inventory levels", () =>
    createInventoryItemStockLevels(container, stockLocation.id).then()
  );
  logger.info("Creating default commission...");
  await runStep("Create default commission", () =>
    createDefaultCommissionLevel(container).then()
  );

  logger.info("=== Finished ===");
  logger.info(`Publishable api key: ${apiKey.token}`);
  logger.info(`Admin panel access:`);
  logger.info(`email: admin@teniam.com`);
  logger.info(`pass: supersecret`);
  logger.info(`Vendor panel access:`);
  logger.info(`email: seller@mercurjs.com`);
  logger.info(`pass: secret`);
}
