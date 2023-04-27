package types

import (
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const (
	TypeMsgBurnCarbonCredit = "burn_carbon_credit"
)

// MsgBurnCarbonCredit is the message for burning carbon credits
type MsgBurnCarbonCredit struct {
	Sender   sdk.AccAddress `json:"sender"`
	Amount   sdk.Int        `json:"amount"`
}

// NewMsgBurnCarbonCredit creates a new MsgBurnCarbonCredit
func NewMsgBurnCarbonCredit(sender sdk.AccAddress, amount sdk.Int) MsgBurnCarbonCredit {
	return MsgBurnCarbonCredit{
		Sender: sender,
		Amount: amount,
	}
}

// Route returns the name of the module
func (msg MsgBurnCarbonCredit) Route() string {
	return RouterKey
}

// Type returns the type of the message
func (msg MsgBurnCarbonCredit) Type() string {
	return TypeMsgBurnCarbonCredit
}

// ValidateBasic validates the message's fields
func (msg MsgBurnCarbonCredit) ValidateBasic() error {
	if msg.Sender.Empty() {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, "sender address must not be empty")
	}
	if msg.Amount.LTE(sdk.ZeroInt()) {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidCoins, "amount must be positive")
	}
	return nil
}

// GetSignBytes returns the message's bytes to sign
func (msg MsgBurnCarbonCredit) GetSignBytes() []byte {
	return sdk.MustSortJSON(ModuleCdc.MustMarshalJSON(msg))
}

// GetSigners returns the addresses of the signers
func (msg MsgBurnCarbonCredit) GetSigners() []sdk.AccAddress {
	return []sdk.AccAddress{msg.Sender}
}

// String returns the string representation of the message
func (msg MsgBurnCarbonCredit) String() string {
	return fmt.Sprintf("MsgBurnCarbonCredit{Sender: %s, Amount: %s}", msg.Sender, msg.Amount)
}
