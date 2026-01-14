import { MedusaContainer } from '@medusajs/framework';
import { ContainerRegistrationKeys } from '@medusajs/framework/utils';

/**
 * Fetches store data using the query system.
 * This is a workaround for the missing fetchStoreData function in @mercurjs/framework
 */
export async function fetchStoreData(container: MedusaContainer) {
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  
  const { data: stores } = await query.graph({
    entity: 'store',
    fields: [
      'id',
      'name',
      'default_sales_channel_id',
      'default_region_id',
      'default_location_id',
      'metadata',
      'supported_currencies.*',
      'currency.*',
    ],
  });

  return stores?.[0] || null;
}
