package keeper

import (
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/bank"

	"github.com/yourusername/yourproject/x/carboncredit/bridge/types"
)

// Keeper defines the expected bank keeper
type Keeper struct {
	bankKeeper bank.Keeper
	cdc        *codec.Codec
	storeKey   sdk.StoreKey
}

// NewKeeper creates a new CarbonCreditBridge Keeper instance
func NewKeeper(cdc *codec.Codec, storeKey sdk.StoreKey, bankKeeper bank.Keeper) Keeper {
	return Keeper{
		bankKeeper: bankKeeper,
		cdc:        cdc,
		storeKey:   storeKey,
	}
}

// GetBridge returns the CarbonCreditBridge for the given ID
func (k Keeper) GetBridge(ctx sdk.Context, bridgeID string) (types.CarbonCreditBridge, bool) {
	store := ctx.KVStore(k.storeKey)
	key := []byte(bridgeID)

	if !store.Has(key) {
		return types.CarbonCreditBridge{}, false
	}

	bz := store.Get(key)
	var bridge types.CarbonCreditBridge
	k.cdc.MustUnmarshalBinaryBare(bz, &bridge)

	return bridge, true
}

// SetBridge sets the CarbonCreditBridge for the given ID
func (k Keeper) SetBridge(ctx sdk.Context, bridgeID string, bridge types.CarbonCreditBridge) {
	store := ctx.KVStore(k.storeKey)
	key := []byte(bridgeID)

	bz := k.cdc.MustMarshalBinaryBare(bridge)
	store.Set(key, bz)
}
