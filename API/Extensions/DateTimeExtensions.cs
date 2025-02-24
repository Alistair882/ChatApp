using System;

namespace API.Extensions;

public static class DateTimeExtensions
{
    public static int CalculateAge(this DateOnly dob)
    {
        var today = DateOnly.FromDateTime(DateTime.Now);

        int age = today.Year - dob.Year;

        // Build the "this year's birthday".
        // If dob is Feb. 29 and this year isn't a leap year, we treat the birthday as Feb. 28.
        int month = dob.Month;
        int day = dob.Day;
        
        if (month == 2 && day == 29 && !DateTime.IsLeapYear(today.Year))
        {
            day = 28;
        }
        
        var thisYearsBirthday = new DateOnly(today.Year, month, day);

        // If this year's birthday is still in the future, subtract a year.
        if (thisYearsBirthday > today)
        {
            age--;
        }

        return age;
    }
}
