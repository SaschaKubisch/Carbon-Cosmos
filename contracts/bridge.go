package carboncreditbridge

import (
    "github.com/cosmos/cosmos-sdk/codec"
    sdk "github.com/cosmos/cosmos-sdk/types"
    "github.com/regen-network/regen-ledger/x/ecocredit"
)

// CarbonCreditBridge is the structure of the carbon credit bridge contract
type CarbonCreditBridge struct {
    BridgeID          string         `json:"bridge_id"`
    BridgeAddress     sdk.AccAddress `json:"bridge_address"`
    WrappedNCTBalance sdk.Coin       `json:"wrapped_nct_balance"`
}

// NewCarbonCreditBridge creates a new CarbonCreditBridge
func NewCarbonCreditBridge(bridgeID string, bridgeAddress sdk.AccAddress) CarbonCreditBridge {
    return CarbonCreditBridge{
        BridgeID:          bridgeID,
        BridgeAddress:     bridgeAddress,
        WrappedNCTBalance: sdk.NewCoin("wnct", sdk.ZeroInt()),
    }
}

// WrapNCT wraps NCT tokens into Wrapped NCT tokens
func (b *CarbonCreditBridge) WrapNCT(ctx sdk.Context, k Keeper, amount sdk.Int) {
    newBalance := b.WrappedNCTBalance.Add(sdk.NewCoin("wnct", amount))
    b.WrappedNCTBalance = newBalance
}

// UnwrapNCT unwraps Wrapped NCT tokens into NCT tokens
func (b *CarbonCreditBridge) UnwrapNCT(ctx sdk.Context, k Keeper, amount sdk.Int) {
    newBalance := b.WrappedNCTBalance.Sub(sdk.NewCoin("wnct", amount))
    b.WrappedNCTBalance = newBalance
}

// TransferTokens transfers Wrapped NCT tokens between the bridge and the pool
func (b *CarbonCreditBridge) TransferTokens(ctx sdk.Context, k Keeper, poolAddress sdk.AccAddress, amount sdk.Int) error {
// Ensure the bridge has enough Wrapped NCT tokens to transfer
if b.WrappedNCTBalance.Amount.LT(amount) {
return sdkerrors.Wrapf(sdkerrors.ErrInsufficientFunds, "insufficient Wrapped NCT balance: %s", b.WrappedNCTBalance)
}
// Transfer Wrapped NCT tokens from the bridge to the pool
err := k.bankKeeper.SendCoins(ctx, b.BridgeAddress, poolAddress, sdk.NewCoins(sdk.NewCoin("wnct", amount)))
if err != nil {
    return err
}

// Update the Wrapped NCT balance of the bridge
newBalance := b.WrappedNCTBalance.Sub(sdk.NewCoin("wnct", amount))
b.WrappedNCTBalance = newBalance

return nil
}

// Keeper defines the expected bank keeper and ecocredit keeper
type Keeper struct {
bankKeeper bank.Keeper
ecocreditKeeper ecocredit.Keeper
cdc *codec.Codec
}
