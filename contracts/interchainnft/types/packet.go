package types

import (
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

// NFTTransferPacketData defines the data for an ICS-721 NFT transfer packet
type NFTTransferPacketData struct {
	Sender    sdk.AccAddress `json:"sender"`
	Receiver  sdk.AccAddress `json:"receiver"`
	Denom     string         `json:"denom"`
	TokenID   string         `json:"token_id"`
	TokenURI  string         `json:"token_uri"`
}

// NewNFTTransferPacketData creates a new NFTTransferPacketData instance
func NewNFTTransferPacketData(sender, receiver sdk.AccAddress, denom, tokenID, tokenURI string) NFTTransferPacketData {
	return NFTTransferPacketData{
		Sender:   sender,
		Receiver: receiver,
		Denom:    denom,
		TokenID:  tokenID,
		TokenURI: tokenURI,
	}
}

// ValidateBasic performs a basic validation of the packet data
func (p NFTTransferPacketData) ValidateBasic() error {
	if p.Sender.Empty() {
		return fmt.Errorf("sender address cannot be empty")
	}
	if p.Receiver.Empty() {
		return fmt.Errorf("receiver address cannot be empty")
	}
	if len(p.Denom) == 0 {
		return fmt.Errorf("denom cannot be empty")
	}
	if len(p.TokenID) == 0 {
		return fmt.Errorf("token ID cannot be empty")
	}
	return nil
}

// GetBytes returns the byte representation of the packet data
func (p NFTTransferPacketData) GetBytes() []byte {
	return sdk.MustSortJSON(ModuleCdc.MustMarshalJSON(p))
}
