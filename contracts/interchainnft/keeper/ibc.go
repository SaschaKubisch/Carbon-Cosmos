package interchainnft

import (
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/ibc/core/channelkeeper"
	"github.com/cosmos/cosmos-sdk/x/nft"
	"github.com/your_username/your_project/interchainnft/types"
)

// SendNFTPacket creates and sends an ICS-721 NFT transfer packet
func (k Keeper) SendNFTPacket(
	ctx sdk.Context,
	sender sdk.AccAddress,
	receiver string,
	denom string,
	tokenID string,
	sourceChannel string,
) error {
	nft, err := k.nftKeeper.GetNFT(ctx, denom, tokenID)
	if err != nil {
		return err
	}

	// Create the ICS-721 NFT transfer packet
	packet := types.NewNFTTransferPacket(
		sender.String(),
		receiver,
		denom,
		tokenID,
		nft.TokenURI,
	)

	channelCap, ok := k.channelKeeper.GetChannelCapability(ctx, sourceChannel)
	if !ok {
		return sdkerrors.Wrapf(channel.ErrChannelCapabilityNotFound, "could not find channel capability for channel: %s", sourceChannel)
	}

	// Send the packet
	return k.channelKeeper.SendPacket(ctx, channelCap, packet.GetPacket())
}

// OnRecvNFTPacket processes a received ICS-721 NFT transfer packet
func (k Keeper) OnRecvNFTPacket(ctx sdk.Context, packet types.NFTTransferPacket) error {
	receiver, err := sdk.AccAddressFromBech32(packet.Receiver)
	if err != nil {
		return err
	}

	// Mint the NFT in the receiving chain
	return k.MintInterchainNFT(ctx, packet.Sender, receiver, packet.Denom, packet.TokenID, packet.TokenURI)
}

// OnAcknowledgementNFTPacket processes the acknowledgement of an ICS-721 NFT transfer packet
func (k Keeper) OnAcknowledgementNFTPacket(ctx sdk.Context, packet types.NFTTransferPacket, acknowledgement channelkeeper.Acknowledgement) error {
	if err := acknowledgement.Unmarshal(&channeltypes.Acknowledgement{}); err != nil {
		return err
	}

	sender, err := sdk.AccAddressFromBech32(packet.Sender)
	if err != nil {
		return err
	}

	// Burn the NFT in the sending chain
	return k.nftKeeper.BurnNFT(ctx, sender, packet.Denom, packet.TokenID)
}

// OnTimeoutNFTPacket processes the timeout of an ICS-721 NFT transfer packet
func (k Keeper) OnTimeoutNFTPacket(ctx sdk.Context, packet types.NFTTransferPacket) error {
	sender, err := sdk.AccAddressFromBech32(packet.Sender)
	if err != nil {
		return err
	}

	// Refund the NFT to the sender
	err = k.nftKeeper.TransferOwner(ctx, packet.Denom, packet.TokenID, k.GetModuleAddress().String(), sender.String())
	if err != nil {
		return sdkerrors.Wrapf(types.ErrRefundNFT, "failed to refund NFT to sender: %s", sender)
	}

	return nil
}
