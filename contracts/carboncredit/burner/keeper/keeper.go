package burner

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// Keeper maintains the link to storage and exposes getter/setter methods for various parts of the state machine
type Keeper struct {
	bankKeeper sdk.BankKeeper
}

// NewKeeper creates new instances of the carboncredit burning Keeper
func NewKeeper(bankKeeper sdk.BankKeeper) Keeper {
	return Keeper{
		bankKeeper: bankKeeper,
	}
}

// BurnCarbonCredit burns the specified amount of carbon credits from the sender's account
func (k Keeper) BurnCarbonCredit(ctx sdk.Context, sender sdk.AccAddress, amount sdk.Coin) error {
	// Check if the sender has enough carbon credits
	if !k.bankKeeper.HasCoins(ctx, sender, sdk.NewCoins(amount)) {
		return sdkerrors.Wrapf(sdkerrors.ErrInsufficientFunds, "insufficient carbon credits balance: %s", amount)
	}

	// Burn the carbon credits from the sender's account
	err := k.bankKeeper.BurnCoins(ctx, sender, sdk.NewCoins(amount))
	if err != nil {
		return err
	}

	return nil
}
