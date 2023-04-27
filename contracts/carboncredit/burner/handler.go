package burner

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/your_username/your_project_name/x/carboncredit/burner/types"
)

// NewHandler returns a handler for all "carboncredit" type messages
func NewHandler(keeper Keeper) sdk.Handler {
	return func(ctx sdk.Context, msg sdk.Msg) (*sdk.Result, error) {
		switch msg := msg.(type) {
		case types.MsgBurnCarbonCredit:
			return handleMsgBurnCarbonCredit(ctx, keeper, msg)
		default:
			errMsg := fmt.Sprintf("unrecognized %s message type: %T", types.ModuleName, msg)
			return nil, errors.Wrap(errors.ErrUnknownRequest, errMsg)
		}
	}
}

// handleMsgBurnCarbonCredit processes the MsgBurnCarbonCredit message
func handleMsgBurnCarbonCredit(ctx sdk.Context, keeper Keeper, msg types.MsgBurnCarbonCredit) (*sdk.Result, error) {
	err := keeper.BurnCarbonCredit(ctx, msg.Sender, msg.Amount)
	if err != nil {
		return nil, err
	}

	ctx.EventManager().EmitEvent(sdk.NewEvent(
		types.EventTypeBurnCarbonCredit,
		sdk.NewAttribute(types.AttributeKeySender, msg.Sender.String()),
		sdk.NewAttribute(types.AttributeKeyAmount, msg.Amount.String()),
	))

	return &sdk.Result{
		Events: ctx.EventManager().Events(),
	}, nil
}
