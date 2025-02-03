const ActionsEnum = {
    LIGHT_HIT: -3,
    MEDIUM_HIT: -6,
    HEAVY_HIT: -9,
    DRAW: -15,
    PUNCH: 2,
    BEND: 7,
    UPSET: 13,
    SHRINK: 16,
    NONE: 0,

    getSequenceActions() {
        return Object.entries(this)
            .filter(([key, value]) => key !== "NONE" && typeof value === "number")
            .map(([key, value]) => ({ key, value }));
    },

    getActionsValues() {
        return Object.values(this)
            .filter(value => value !== this.NONE && typeof value === "number");
    },

    getComboActions() {
        return [{ key: "NONE", value: this.NONE }, ...this.getSequenceActions()];
    }
};

export default ActionsEnum;
