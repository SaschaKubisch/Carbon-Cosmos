package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/bank"
	"github.com/yourusername/yourproject/x/carboncredit/pool/types"
)

// Keeper defines the expected bank keeper and pool store
type Keeper struct {
	bankKeeper bank.Keeper
	storeKey   sdk.StoreKey
	cdc        *codec.Codec
}

// NewKeeper creates a new keeper for the carbon credit pool
func NewKeeper(bankKeeper bank.Keeper, storeKey sdk.StoreKey, cdc *codec.Codec) Keeper {
	return Keeper{
		bankKeeper: bankKeeper,
		storeKey:   storeKey,
		cdc:        cdc,
	}
}

// GetCarbonCreditPool retrieves the CarbonCreditPool from the store
func (k Keeper) GetCarbonCreditPool(ctx sdk.Context, poolID string) (types.CarbonCreditPool, error) {
	store := ctx.KVStore(k.storeKey)
	poolBytes := store.Get([]byte(poolID))

	if poolBytes == nil {
		return types.CarbonCreditPool{}, sdkerrors.Wrapf(types.ErrPoolNotFound, "pool %s not found", poolID)
	}

	var pool types.CarbonCreditPool
	k.cdc.MustUnmarshalBinaryBare(poolBytes, &pool)
	return pool, nil
}

// SetCarbonCreditPool sets the CarbonCreditPool in the store
func (k Keeper) SetCarbonCreditPool(ctx sdk.Context, pool types.CarbonCreditPool) {
	store := ctx.KVStore(k.storeKey)
	poolBytes := k.cdc.MustMarshalBinaryBare(&pool)
	store.Set([]byte(pool.PoolID), poolBytes)
}

// AddNCT adds NCT tokens to the specified carbon credit pool
func (k Keeper) AddNCT(ctx sdk.Context, poolID string, amount sdk.Int) error {
	pool, err := k.GetCarbonCreditPool(ctx, poolID)

	if err != nil {
		return err
	}

	pool.AddNCT(amount)
	k.SetCarbonCreditPool(ctx, pool)
	return nil
}

// RemoveNCT removes NCT tokens from the specified carbon credit pool
func (k Keeper) RemoveNCT(ctx sdk.Context, poolID string, amount sdk.Int) error {
	pool, err := k.GetCarbonCreditPool(ctx, poolID)

	if err != nil {
		return err
	}

	pool.RemoveNCT(amount)
	k.SetCarbonCreditPool(ctx, pool)
	return nil
}
