/**
 * Cloudflare Worker entry point
 * 
 * Note: Medusa.js is a full Node.js framework and may not be fully compatible
 * with Cloudflare Workers due to Node.js API limitations. This is a basic
 * entry point that may need to be adapted based on your specific needs.
 */

export default {
  async fetch(request: Request, env: any, ctx: ExecutionContext): Promise<Response> {
    // Basic handler - you may need to integrate with Medusa's HTTP server here
    // For now, this is a placeholder that satisfies wrangler's requirements
    
    try {
      // TODO: Integrate with Medusa's HTTP handler
      // This would typically involve initializing Medusa and routing requests
      
      return new Response('Medusa backend on Cloudflare Workers', {
        status: 200,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    } catch (error) {
      return new Response(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`, {
        status: 500,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    }
  },
};
