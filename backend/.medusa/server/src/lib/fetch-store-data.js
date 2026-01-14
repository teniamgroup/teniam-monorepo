"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchStoreData = fetchStoreData;
const utils_1 = require("@medusajs/framework/utils");
/**
 * Fetches store data using the query system.
 * This is a workaround for the missing fetchStoreData function in @mercurjs/framework
 */
async function fetchStoreData(container) {
    const query = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmV0Y2gtc3RvcmUtZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvZmV0Y2gtc3RvcmUtZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQU9BLHdDQWtCQztBQXhCRCxxREFBc0U7QUFFdEU7OztHQUdHO0FBQ0ksS0FBSyxVQUFVLGNBQWMsQ0FBQyxTQUEwQjtJQUM3RCxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRWpFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsTUFBTSxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ3pDLE1BQU0sRUFBRSxPQUFPO1FBQ2YsTUFBTSxFQUFFO1lBQ04sSUFBSTtZQUNKLE1BQU07WUFDTiwwQkFBMEI7WUFDMUIsbUJBQW1CO1lBQ25CLHFCQUFxQjtZQUNyQixVQUFVO1lBQ1Ysd0JBQXdCO1lBQ3hCLFlBQVk7U0FDYjtLQUNGLENBQUMsQ0FBQztJQUVILE9BQU8sTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDO0FBQzdCLENBQUMifQ==