interface DollarCoin {
  value: number;
}

class Penny implements DollarCoin {
  readonly value = 0.01;
}

class Nickel implements DollarCoin {
  readonly value = 0.05;
}

class Dime implements DollarCoin {
  readonly value = 0.10;
}

class Quarter implements DollarCoin {
  readonly value = 0.25;
}

class VendingMachine {
  private coins: DollarCoin[] = [];
  private readonly currencySymbol = "$";
  private _returnedCoins: DollarCoin[] = [];

  public insertCoins(coins: DollarCoin[]) {
    const invalidCoins = coins.filter(coin => coin instanceof Penny);
    const validCoins = coins.filter(coin => !(coin instanceof Penny));
    this._returnedCoins = invalidCoins;
    this.coins = validCoins;
  }

  public displayedInformation(): string {
    if (!this.areThereCoinsInserted()) {
      return "INSERT COIN";
    }

    const currentAmount = this.coins.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.value;
    }, 0)

    return this.currencySymbol + currentAmount.toFixed(2);
  }

  private areThereCoinsInserted() {
    return this.coins.length > 0;
  }

  get returnedCoins(): DollarCoin[] {
    return this._returnedCoins;
  }
}

describe("Vending Machine", () => {
  it("should display INSERT COIN when there are not coins inserted", () => {
    const vendingMachine = new VendingMachine();

    expect(vendingMachine.displayedInformation()).toEqual("INSERT COIN");
  });

  it("should accept a Nickel", () => {
    const vendingMachine = new VendingMachine();
    const nickel = new Nickel();

    vendingMachine.insertCoins([nickel]);

    expect(vendingMachine.displayedInformation()).toEqual("$0.05");
  });

  it("should accept a Dime", () => {
    const vendingMachine = new VendingMachine();
    const dimes = new Dime();

    vendingMachine.insertCoins([dimes]);

    expect(vendingMachine.displayedInformation()).toEqual("$0.10");
  });

  it("should accept a Quarter", () => {
    const vendingMachine = new VendingMachine();
    const quarter = new Quarter();

    vendingMachine.insertCoins([quarter]);

    expect(vendingMachine.displayedInformation()).toEqual("$0.25");
  });

  it("should accept valid coins", () => {
    const vendingMachine = new VendingMachine();
    const quarter = new Quarter();
    const dime = new Dime();
    const nickel = new Nickel();

    vendingMachine.insertCoins([quarter, dime, nickel]);

    expect(vendingMachine.displayedInformation()).toEqual("$0.40");
  });

  it("should reject Penny", () => {
    const vendingMachine = new VendingMachine();
    const penny = new Penny();

    vendingMachine.insertCoins([penny]);

    expect(vendingMachine.returnedCoins).toEqual([penny]);
    expect(vendingMachine.displayedInformation()).toEqual("INSERT COIN");
  });
});
