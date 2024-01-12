interface Coin {
  value: number;
  symbol: string;
}

class Nickel implements Coin {
  value = 0.05;
  symbol = "$";
}

class VendingMachine {
  private coins: Coin[] = [];

  public insertCoins(coins: Coin[]) {
    this.coins = coins;
  }

  public displayedAmount(): string {
    if (!this.areThereCoinsInserted()) {
      return "INSERT COIN";
    }
    return this.coins.at(0).value + this.coins.at(0).symbol;
  }

  private areThereCoinsInserted() {
    return this.coins.length > 0;
  }
}

describe("Vending Machine", () => {
  it("should accept Nickels", () => {
    const vendingMachine = new VendingMachine();
    const nickel = new Nickel();

    vendingMachine.insertCoins([Nickel]);

    expect(vendingMachine.displayedAmount()).toEqual("0.05");
  });
});
