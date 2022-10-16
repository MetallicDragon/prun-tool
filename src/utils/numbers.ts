export default {
    formatCurrency(n: number) {
        if (!n) return "-";

        let powers = 0
        let suffix = null;
        let formatted = "";
        while(n >= 100_000) {
            n /= 1000;
            powers += 3;
            switch (suffix){
                case null:
                    suffix = "k";
                    break;
                case "k":
                    suffix = "m";
                    break;
                case "m":
                    suffix = "b";
                    break;
                default:
                    suffix = "e" + powers;
            }
        }
        
        let maxDecimals;
        if (powers > 0 || n >= 10_000) {
            maxDecimals = 0;
        }
        
        formatted = formatted + n.toLocaleString('en-US', {minimumFractionDigits:0, maximumFractionDigits: maxDecimals})
        if (suffix) formatted = formatted + suffix;

        return formatted
    }
}