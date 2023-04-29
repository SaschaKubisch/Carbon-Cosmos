package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

// MsgMintInterchainNFT represents the message for minting a new Interchain NFT
type MsgMintInterchainNFT struct {
	Sender       sdk.AccAddress `json:"sender"`
	Recipient    sdk.AccAddress `json:"recipient"`
	Denom        string         `json:"denom"`
	TokenID      string         `json:"token_id"`
	TokenURI     string         `json:"token_uri"`
}

// NewMsgMintInterchainNFT creates a new MsgMintInterchainNFT instance
func NewMsgMintInterchainNFT(sender, recipient sdk.AccAddress, denom, tokenID, tokenURI string) MsgMintInterchainNFT {
	return MsgMintInterchainNFT{
		Sender:    sender,
		Recipient: recipient,
		Denom:     denom,
		TokenID:   tokenID,
		TokenURI:  tokenURI,
	}
}

// Route returns the name of the module
func (msg MsgMintInterchainNFT) Route() string {
	return RouterKey
}

// Type returns the type of the message
func (msg MsgMintInterchainNFT) Type() string {
	return "mint_interchain_nft"
}

// ValidateBasic performs a basic validation of the message data
func (msg MsgMintInterchainNFT) ValidateBasic() error {
	if msg.Sender.Empty() {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, "sender address cannot be empty")
	}
	if msg.Recipient.Empty() {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, "recipient address cannot be empty")
	}
	if len(msg.Denom) == 0 {
		return sdkerrors.Wrap(sdkerrors.ErrUnknownRequest, "denom cannot be empty")
	}
	if len(msg.TokenID) == 0 {
		return sdkerrors.Wrap(sdkerrors.ErrUnknownRequest, "token ID cannot be empty")
	}
	return nil
}

// GetSignBytes returns the byte representation of the message for signing
func (msg MsgMintInterchainNFT) GetSignBytes() []byte {
	return sdk.MustSortJSON(ModuleCdc.MustMarshalJSON(msg))
}

// GetSigners returns the addresses of the message signers
func (msg MsgMintInterchainNFT) GetSigners() []sdk.AccAddress {
	return []sdk.AccAddress{msg.Sender}
}
