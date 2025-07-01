import { useMutation } from "@apollo/client";
import { CREATE_TEAM } from "@/graphql/client/mutations/teamMutations";

export const useCreateTeam = () => {
  return useMutation(CREATE_TEAM);
};
