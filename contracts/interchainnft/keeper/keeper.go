package interchainnft

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/nft"
	"github.com/your_username/your_project/interchainnft/types"
)

// Keeper defines the expected nft keeper
type Keeper struct {
	nftKeeper nft.Keeper
}

// NewKeeper creates a new instance of the interchainnft Keeper
func NewKeeper(nftKeeper nft.Keeper) Keeper {
	return Keeper{
		nftKeeper: nftKeeper,
	}
}

// MintInterchainNFT mints a new interchain NFT
func (k Keeper) MintInterchainNFT(ctx sdk.Context, sender, receiver sdk.AccAddress, denom, tokenID, tokenURI string) error {
	err := k.nftKeeper.MintNFT(ctx, denom, tokenID, tokenURI, receiver)
	if err != nil {
		return err
	}

	return nil
}

// TransferInterchainNFT transfers an interchain NFT to another account
func (k Keeper) TransferInterchainNFT(ctx sdk.Context, sender, receiver sdk.AccAddress, denom, tokenID string) error {
	err := k.nftKeeper.TransferNFT(ctx, sender, receiver, denom, tokenID)
	if err != nil {
		return err
	}

	return nil
}
