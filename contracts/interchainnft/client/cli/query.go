package cli

import (
	"fmt"
	"strconv"

	"github.com/spf13/cobra"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/your_username/your_project/interchainnft/types"
)

// GetQueryCmd returns the query commands for the interchainnft module
func GetQueryCmd() *cobra.Command {
	intercainnftQueryCmd := &cobra.Command{
		Use:                        "interchainnft",
		Short:                      "Interchain NFT query subcommands",
		DisableFlagParsing:         true,
		SuggestionsMinimumDistance: 2,
		RunE:                       client.ValidateCmd,
	}

	intercainnftQueryCmd.AddCommand(
		GetCmdQueryNFT(),
	)

	return intercainnftQueryCmd
}

// GetCmdQueryNFT returns the command for querying an interchain NFT
func GetCmdQueryNFT() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "query [denom] [token-id]",
		Short: "Query an interchain NFT",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}

			denom := args[0]
			tokenID := args[1]

			queryClient := types.NewQueryClient(clientCtx)

			res, err := queryClient.NFT(cmd.Context(), &types.QueryGetNFTRequest{Denom: denom, TokenId: tokenID})
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
