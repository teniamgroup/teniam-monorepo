import {
  Button,
  Container,
  Heading,
  StatusBadge,
  Table,
  Text,
  toast,
} from "@medusajs/ui";
import { useQueryClient } from "@tanstack/react-query";
import { FetchError } from "@medusajs/js-sdk";

import { useAlgolia, useSyncAlgolia, algoliaQueryKeys } from "@hooks/api/algolia";

export const Algolia = () => {
  const { data: algolia } = useAlgolia();
  const { mutateAsync: triggerSynchronization } = useSyncAlgolia();
  const queryClient = useQueryClient();

  const handleTriggerSynchronization = async () => {
    try {
      const response = await triggerSynchronization();
      console.log("Sync response:", response);
      
      // Check if response has useful information
      if (response && typeof response === 'object') {
        if ('error' in response) {
          toast.error(response.error as string);

          return;
        }
        if ('message' in response) {
          toast.success(response.message as string);
        } else {
          toast.success("Synchronization triggered! Refreshing status...");
        }
      } else {
        toast.success("Synchronization triggered! Refreshing status...");
      }
      
      // Refetch the status after a longer delay to allow sync to complete
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: algoliaQueryKeys.all });
      }, 5000);
    } catch (error) {
      console.error("Sync error:", error);
      let errorMessage = "Failed to trigger synchronization";
      if (error instanceof FetchError) {
        errorMessage = error.message || `Error ${error.status}: ${error.message}`;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    }
  };

  return (
    <Container data-testid="algolia-container">
      <div className="flex items-center justify-between px-6 py-4" data-testid="algolia-header">
        <div>
          <Heading data-testid="algolia-heading">Algolia Search Engine</Heading>
          <Text className="text-ui-fg-subtle" size="small" data-testid="algolia-description">
            Check Algolia Search Engine status
          </Text>
        </div>
        <Button onClick={handleTriggerSynchronization} data-testid="algolia-trigger-synchronization-button">
          Trigger Synchronization
        </Button>
      </div>

      <Table data-testid="algolia-table">
        <Table.Body data-testid="algolia-table-body">
          <Table.Row data-testid="algolia-table-row-application-id">
            <Table.Cell data-testid="algolia-table-cell-application-id-label">Application ID</Table.Cell>
            <Table.Cell data-testid="algolia-table-cell-application-id-value">{algolia?.appId}</Table.Cell>
          </Table.Row>
          <Table.Row data-testid="algolia-table-row-product-index">
            <Table.Cell data-testid="algolia-table-cell-product-index-label">ProductIndex</Table.Cell>
            <Table.Cell data-testid="algolia-table-cell-product-index-value">
              {algolia?.productIndex ? (
                <StatusBadge color="green" data-testid="algolia-product-index-exists-badge">Exists</StatusBadge>
              ) : (
                <StatusBadge color="red" data-testid="algolia-product-index-not-exists-badge">Doesn&apos;t exist</StatusBadge>
              )}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Container>
  );
};
