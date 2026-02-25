import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { RegisterResult } from '../backend';

export function useGetMaintenanceMode() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['maintenanceMode'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.getMaintenanceMode();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 10000,
  });
}

export function useToggleMaintenanceMode() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.toggleMaintenanceMode();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenanceMode'] });
    },
  });
}

export function useRegisterUser() {
  const { actor } = useActor();

  return useMutation<RegisterResult, Error, { username: string; password: string }>({
    mutationFn: async ({ username, password }: { username: string; password: string }) => {
      if (!actor) throw new Error('Actor not available');
      const result = await actor.registerUser(username, password);
      // Surface backend errors as thrown exceptions so React Query treats them as failures
      if (result.__kind__ === 'error') {
        throw new Error(result.error);
      }
      return result;
    },
  });
}

export function useAuthenticateUser() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({ username, password }: { username: string; password: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.authenticate(username, password);
    },
  });
}
