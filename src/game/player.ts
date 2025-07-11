export class Player {
  public nickname: string;
  public role: string;
  public char: string;
  public hand: string[];
  public equipment: string[];
  public flags: {
    isPlayerAssigned: boolean;
    isRoleReady: boolean;
    isCharReady: boolean;
    isEliminated: boolean;
    isUnderSight: boolean;
  };
  public stats: {
    health: { current: number; max: number };
    range: number;
    bangCardsPlayed: number;
    bangCardsPlayedLimit: number;
  };
  public _charOptions: { id: string; bullets: number }[];

  constructor() {
    this.nickname = "";
    this.role = "";
    this.char = "";
    this.hand = [];
    this.equipment = [];
    this.flags = {
      isPlayerAssigned: false,
      isRoleReady: false,
      isCharReady: false,
      isEliminated: false,
      isUnderSight: false,
    };
    this.stats = {
      bangCardsPlayed: 0,
      bangCardsPlayedLimit: 1,
      health: {
        current: 0,
        max: 0,
      },
      range: 1,
    };
    this._charOptions = [];
  }

  public assingPlayer(nickname: string) {
    this.nickname = nickname;
    this.flags.isPlayerAssigned = true;
  }

  public assignRole(roleCardId: string) {
    this.role = roleCardId;
    this.flags.isRoleReady = true;
  }

  public pickCharCard(option: 0 | 1) {
    const char = this._charOptions[option];
    this.char = char.id;

    this.stats.health.max =
      this.role === "sheriff" ? char.bullets + 1 : char.bullets;

    this.stats.health.current = this.stats.health.max;

    this.flags.isCharReady = true;
  }

  public takeDamage(damage: number) {
    const currentHealth = this.stats.health.current;

    let newHealth = currentHealth - damage;
    if (newHealth < 0) newHealth = 0;

    if (newHealth === 0) this.flags.isEliminated = true;
  }
}
