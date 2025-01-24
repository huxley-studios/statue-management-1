import React from 'react';

interface GiftCard {
  _id: string;
  activationCode: string;
  status: string;
  orderDetails: {
    size: string;
    numberOfPeople: number;
  };
}

export default function GiftCardList() {
  const [giftCards, setGiftCards] = React.useState<GiftCard[]>([]);

  React.useEffect(() => {
    fetch('/api/gift-cards')
      .then(res => res.json())
      .then(data => setGiftCards(data));
  }, []);

  return (
    <div className="space-y-4">
      {giftCards.map(card => (
        <div key={card._id} className="border p-4 rounded">
          <h3>Code: {card.activationCode}</h3>
          <p>Status: {card.status}</p>
          <p>Size: {card.orderDetails.size}</p>
          <p>People: {card.orderDetails.numberOfPeople}</p>
        </div>
      ))}
    </div>
  );
}
