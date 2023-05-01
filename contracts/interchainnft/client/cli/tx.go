package cli

import (
	"fmt"

	"github.com/spf13/cobra"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/your_username/your_project/interchainnft/types"
)

// GetTxCmd returns the transaction commands for the interchainnft module
func GetTxCmd() *cobra.Command {
	intercainnftTxCmd := &cobra.Command{
		Use:                        "interchainnft",
		Short:                      "Interchain NFT transaction subcommands",
		DisableFlagParsing:         true,
		SuggestionsMinimumDistance: 2,
		RunE:                       client.ValidateCmd,
	}

	intercainnftTxCmd.AddCommand(
		GetCmdMintNFT(),
		GetCmdTransferNFT(),
	)

	return intercainnftTxCmd
}

// GetCmdMintNFT returns the command for minting an interchain NFT
func GetCmdMintNFT() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "mint [denom] [token-id] [recipient]",
		Short: "Mint a new interchain NFT",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}

			denom := args[0]
			tokenID := args[1]
			recipient, err := sdk.AccAddressFromBech32(args[2])
			if err != nil {
				return err
			}

			msg := types.NewMsgMintNFT(clientCtx.GetFromAddress(), recipient, denom, tokenID)
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

// GetCmdTransferNFT returns the command for transferring an interchain NFT
func GetCmdTransferNFT() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "transfer [denom] [token-id] [recipient]",
		Short: "Transfer an interchain NFT",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}

			denom := args[0]
			tokenID := args[1]
			recipient, err := sdk.AccAddressFromBech32(args[2])
			if err != nil {
				return err
			}

			msg := types.NewMsgTransferNFT(clientCtx.GetFromAddress(), recipient, denom, tokenID)
			return tx.GenerateOr.BroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
