import { useMutation } from "@apollo/client";
import { CREATE_LEAGUE } from "@/graphql/client/mutations/leagueMutations";

export const useCreateLeague = () => {
  return useMutation(CREATE_LEAGUE);
};
