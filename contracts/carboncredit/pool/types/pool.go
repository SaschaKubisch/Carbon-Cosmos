package pool

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// CarbonCreditPool represents the structure of the carbon credit pool
type CarbonCreditPool struct {
	PoolID      string         `json:"pool_id"`
	PoolAddress sdk.AccAddress `json:"pool_address"`
	NCTBalance  sdk.Coin       `json:"nct_balance"`
}

// NewCarbonCreditPool creates a new CarbonCreditPool
func NewCarbonCreditPool(poolID string, poolAddress sdk.AccAddress) CarbonCreditPool {
	return CarbonCreditPool{
		PoolID:      poolID,
		PoolAddress: poolAddress,
		NCTBalance:  sdk.NewCoin("nct", sdk.ZeroInt()),
	}
}

// AddNCT adds NCT tokens to the pool
func (p *CarbonCreditPool) AddNCT(amount sdk.Int) {
	newBalance := p.NCTBalance.Add(sdk.NewCoin("nct", amount))
	p.NCTBalance = newBalance
}

// RemoveNCT removes NCT tokens from the pool
func (p *CarbonCreditPool) RemoveNCT(amount sdk.Int) {
	newBalance := p.NCTBalance.Sub(sdk.NewCoin("nct", amount))
	p.NCTBalance = newBalance
}
