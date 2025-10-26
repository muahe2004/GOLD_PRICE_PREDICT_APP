export const getDaysInWeek = (weekStr: string) => {
    const [yearStr, weekNumStr] = weekStr.split("-W");
    const year = parseInt(yearStr);
    const weekNum = parseInt(weekNumStr);

    const jan4 = new Date(Date.UTC(year, 0, 4));
    const dayOfWeek = jan4.getUTCDay() || 7; 
    const firstDayOfWeek1 = new Date(jan4);
    firstDayOfWeek1.setUTCDate(jan4.getUTCDate() - (dayOfWeek - 1));

    const firstDayOfTargetWeek = new Date(firstDayOfWeek1);
    firstDayOfTargetWeek.setUTCDate(firstDayOfWeek1.getUTCDate() + (weekNum - 1) * 7);

    const days = Array.from({ length: 7 }).map((_, i) => {
        const d = new Date(firstDayOfTargetWeek);
        d.setUTCDate(firstDayOfTargetWeek.getUTCDate() + i);
        return d.toISOString().split("T")[0];
    });

    return days;
};