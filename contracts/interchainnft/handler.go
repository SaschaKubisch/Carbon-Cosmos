package interchainnft

import (
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/ibc/28-commitment/types"
	"github.com/your_username/your_project/interchainnft/types"
)

// NewHandler creates a new instance of the handler for the interchainnft module
func NewHandler(k Keeper) sdk.Handler {
	return func(ctx sdk.Context, msg sdk.Msg) (*sdk.Result, error) {
		switch msg := msg.(type) {
		case types.MsgMintInterchainNFT:
			return handleMsgMintInterchainNFT(ctx, k, msg)
		case types.MsgTransferInterchainNFT:
			return handleMsgTransferInterchainNFT(ctx, k, msg)
		default:
			errMsg := fmt.Sprintf("unrecognized %s message type: %T", types.ModuleName, msg)
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnknownRequest, errMsg)
		}
	}
}

func handleMsgMintInterchainNFT(ctx sdk.Context, k Keeper, msg types.MsgMintInterchainNFT) (*sdk.Result, error) {
	err := k.MintInterchainNFT(ctx, msg.Sender, msg.Receiver, msg.Denom, msg.TokenID, msg.TokenURI)
	if err != nil {
		return nil, err
	}

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(
			types.EventTypeMintInterchainNFT,
			sdk.NewAttribute(types.AttributeKeySender, msg.Sender.String()),
			sdk.NewAttribute(types.AttributeKeyReceiver, msg.Receiver.String()),
			sdk.NewAttribute(types.AttributeKeyDenom, msg.Denom),
			sdk.NewAttribute(types.AttributeKeyTokenID, msg.TokenID),
			sdk.NewAttribute(types.AttributeKeyTokenURI, msg.TokenURI),
		),
	)

	return &sdk.Result{
		Events: ctx.EventManager().Events(),
	}, nil
}

func handleMsgTransferInterchainNFT(ctx sdk.Context, k Keeper, msg types.MsgTransferInterchainNFT) (*sdk.Result, error) {
	err := k.TransferInterchainNFT(ctx, msg.Sender, msg.Receiver, msg.Denom, msg.TokenID)
	if err != nil {
		return nil, err
	}

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(
			types.EventTypeTransferInterchainNFT,
			sdk.NewAttribute(types.AttributeKeySender, msg.Sender.String()),
			sdk.NewAttribute(types.AttributeKeyReceiver, msg.Receiver.String()),
			sdk.NewAttribute(types.AttributeKeyDenom, msg.Denom),
			sdk.NewAttribute(types.AttributeKeyTokenID, msg.TokenID),
		),
	)

	return &sdk.Result{
		Events: ctx.EventManager().Events(),
	}, nil
}
