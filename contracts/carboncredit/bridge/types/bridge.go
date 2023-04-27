package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// CarbonCreditBridge represents the structure of the carbon credit bridge contract
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
func (b *CarbonCreditBridge) WrapNCT(amount sdk.Int) {
	newBalance := b.WrappedNCTBalance.Add(sdk.NewCoin("wnct", amount))
	b.WrappedNCTBalance = newBalance
}

// UnwrapNCT unwraps Wrapped NCT tokens into NCT tokens
func (b *CarbonCreditBridge) UnwrapNCT(amount sdk.Int) {
	newBalance := b.WrappedNCTBalance.Sub(sdk.NewCoin("wnct", amount))
	b.WrappedNCTBalance = newBalance
}
