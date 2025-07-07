class StringHelper {
    private text: string;

    constructor(text: string) {
        this.text = text;
    }

    singular(): this {
        if (this.text.endsWith('s') && this.text.length > 1) {
            this.text = this.text.slice(0, -1);
        }
        return this;
    }

    capitalize(): this {
        if (!this.text) return this;
        this.text = this.text[0].toUpperCase() + this.text.slice(1);
        return this;
    }

    value(): string {
        return this.text;
    }
}

export function str(text: string): StringHelper {
    return new StringHelper(text);
}
