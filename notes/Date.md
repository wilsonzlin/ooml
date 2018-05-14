# datetime

**NOTE**: In almost all cases, moment returns moment.invalid(), whereas Python raises an error.

Syntax:

moment = Moment class (JS)
m = an instance of Moment
date = Date class (Python)
d = an instance of Date

**NOTE**: In JS, Moment is used as a helpful wrapper. Need to transparently unwrap every time it's being passed as a Date, and wrap every time non-native functionality is used.

## date

### date(year, month, day)

moment([year, month - 1, day])

#### Python

- Raises ValueError if outside valid range.
- Valid years: MINYEAR (1) to MAXYEAR (9999)

#### Moment

- Valid year range is much wider.
- 0-99 years map to 1900-1999.

### date.today()

moment()

### date.fromtimestamp(timestamp)

moment.unix(timestamp)

#### Python

- Raises OverflowError and OSError.
- Returns local date.

#### Moment

- Valid range is unknown; seems to be around +/-(2 ^ 42).
- Without .utc(), uses local mode.

### date.fromordinal(ordinal)

moment([0, 11, 31]).add(moment.duration(ordinal, 'days'))

#### Python

- Raises ValueError is ordinal is less than 1 or greater than date.max.toordinal() (3652059).

### d.year

m.getYear()

### d.month

m.getMonth() + 1

### d.day

m.getDate()

### d2 = d1 + timedelta

**WARNING**: There may be unconsidered intricacies.

m2 = m1.add(duration)

### d2 = d1 - timedelta

**WARNING**: There may be unconsidered intricacies.

m2 = m1.subtract(duration)

### timedelta = d1 - d2

**WARNING**: There may be unconsidered intricacies.

duration = moment.duration(m1.diff(m2))

### d1 < d2

**WARNING**: There may be unconsidered intricacies.

m1.isBefore(m2)

### dict[d]

*Unsupported*: Moment instances are mutable, and different instances will not map to the same key.

### d.replace(year=self.year, month=self.month, day=self.day)

*NOTE*: Use `.set` so anything not provided doesn't change.

m.clone().set({ year: year, month: month, date: day })

### d.timetuple()

*Unsupported*.

### d.toordinal()

Math.floor(moment.duration(d.diff(moment([0, 11, 31]))).asDays())

### d.weekday()

m.day()

### d.isoweekday()

m.isoWeekday()

### d.isocalendar()

**WARNING**: There may be unconsidered intricacies.

Object.freeze([m.isoWeekYear(), m.isoWeek(), m.isoWeekday()])

### d.isoformat()

**NOTE**: "Y" complies with the ISO 8601 standard for dates past the year 9999.

m.format("Y-MM-DD")

### d.__str__()

*Same as d.isoformat()*.

### d.ctime()

**WARNING**: There may be unconsidered intricacies.

m.toString()

### d.strftime(format)

**WARNING**: There may be unconsidered intricacies.

**NOTE**: Depends on moment-strftime.

m.strftime(format)

### d.__format__(format)

*Unsupported*.

## datetime

**WARNING**: There is no concept of naive in Moment. Expected "naive" Moment instances will usually be set to either UTC or local timezone. **No error will be thrown when "naive" and "aware" instances are used together.**

### datetime(year, month, day, hour=0, minute=0, second=0, microsecond=0)

**NOTE**: The overload for this constructor with time zone information is considered separate.

moment([year, month - 1, day, hour, minute, second, microsecond / 1000])

### datetime(year, month, day, hour=0, minute=0, second=0, microsecond=0, tzinfo=None, *, fold=0)

**NOTE**: This is a separate overload, as this depends on moment-timezone and transpiles quite differently.

**NOTE**: $tzinfo must be a valid instance of pytz.BaseTzInfo (which itself maps to moment.tz.Zone).

**NOTE**: $fold must be 0, due to moment-timezone fall back behaviour.

**NOTE**: This sets, not converts to, a specific timezone.

moment.tz([year, month - 1, day, hour, minute, second, microsecond / 1000], tzinfo.name)

### datetime.today()

moment()

#### Python

- $tzinfo is set to None, so it is the local date and time.

### datetime.now(tz=None)

Need a ternary because:
  - `moment().tz(undefined)` is a getter
  - `moment().set("tz", "Actual/Timezone")` doesn't set anything
  - `moment.tz(moment(), undefined)` returns in UTC mode

tz ? moment().tz(tz.name) : moment()

### datetime.utcnow()

moment.utc()

#### Moment

- Not actually naive; timezone is set to UTC.

### datetime.fromtimestamp(timestamp, tz=None)

tz ? moment.unix(timestamp).tz(tz.name) : moment.unix(timestamp)

### datetime.utcfromtimestamp(timestamp)

moment.unix(timestamp).utc()

#### Moment

- Not actually naive; timezone is set to UTC.

### datetime.fromordinal(ordinal)

*Same as date.fromordinal(ordinal)*.

### datetime.combine(date, time, tzinfo=self.tzinfo)

**WARNING**: There may be unconsidered intricacies.

moment.tz([date.year(), date.month(), date.date(), time.hour(), time.minute(), time.second(), time.millisecond()], tzinfo ? tzinfo.name : time.tz())

### datetime.strptime(date_string, format)

*Unsupported*.

### datetime.min

moment([1, 0, 1])

#### Python

- $tzinfo is None, so is local.

#### Moment

- Not actually naive; timezone is set to local.

### datetime.max

moment([9999, 11, 31, 23, 59, 59, 999.999])

#### Python

- $tzinfo is None, so is local.

### datetime.resolution

moment.duration(0.001)

### dt.year

m.year()

### dt.month

m.month() + 1

### dt.day

m.date()

### dt.hour

m.hour()

### dt.minute

m.minute()

### dt.second

m.second()

### dt.microsecond

m.millisecond() * 1000

### dt.tzinfo

moment.tz.zone(m.tz())

### dt2 = dt1 + timedelta

**WARNING**: No error will be thrown if one is naive and the other isn't, as naive instances are set to UTC or local in Moment.

**WARNING**: There may be unconsidered intricacies.

m2 = m1.add(duration)

### dt2 = dt1 - timedelta

**WARNING**: No error will be thrown if one is naive and the other isn't, as naive instances are set to UTC or local in Moment.

**WARNING**: There may be unconsidered intricacies.

m2 = m1.subtract(duration)

### timedelta = dt1 - dt2

**WARNING**: No error will be thrown if one is naive and the other isn't, as naive instances are set to UTC or local in Moment.

**WARNING**: There may be unconsidered intricacies.

duration = moment.duration(m1.diff(m2))

### dt1 < dt2

**WARNING**: No error will be thrown if one is naive and the other isn't, as naive instances are set to UTC or local in Moment.

**WARNING**: There may be unconsidered intricacies.

m1.isBefore(m2)

### dict[dt]

*Unsupported*: Moment instances are mutable, and different instances will not map to the same key.

### dt.date()

moment([m.year(), m.month(), m.date()])

### dt.time()

moment([m.hour(), m.minute(), m.second(), m.millisecond()])

### dt.timetz()

*WARNING*: This only works with moment.tz. Only using moment would mean timezone-aware time is copied without timezone information.

moment.tz([m.hour(), m.minute(), m.second(), m.millisecond()], m.tz())

### dt.replace(year=self.year, month=self.month, day=self.day, hour=self.hour, minute=self.minute, second=self.second, microsecond=self.microsecond, tzinfo=self.tzinfo, *, fold=0)

*NOTE*: $fold must be 0 (see `datetime()`).

*NOTE*: Expliciting setting $tzinfo to None will convert (not set) the timezone to UTC (see "naive" instances notice at beginning of `datetime`).

*NOTE*: Otherwise, providing $tzinfo sets (not converts) the timezone.

*NOTE*: Use `.set` so anything not provided doesn't change (including the timezone).

*WARNING*: This is very tricky to get right:

- Changing timezone using `.tz` or `.utc` will change the values, which is not allowed.
- Timezone can't actually be erased without using `.utc` from an instance, so a new one needs to be created.
- `.utcOffset` could be calculated by `moment.tz.Zone#parse`, but it won't set/change the timezone, and will be incorrect if a timezone already exists due to interference by the timezone.
- An existing timezone will also affect any setting of invalid values (e.g. skipped time due to DST).
- `moment.tz.Zone#parse` takes some valid time, converts (not sets) it to UTC, and then interprets (not converts) the time as local to get the offset.

```javascript
(function wrapper() {
  var tmp = moment.utc();
  if (tzinfo === null) {
    // Do nothing
  } else if (tzinfo === undefined) {
    tmp.tz(m.tz());
  } else {
    tmp.tz(tzinfo.name);
  }
  tmp.set(m.toObject());
  tmp.set({ year: year, month: month, date: day, hour: hour, minute: minute, second: second, millisecond: microsecond / 1000 });
  return tmp;
})();
```

### dt.astimezone(tz=None)

**NOTE**: If $tz is not provided, convert to local timezone; don't make naive.

**WARNING**: Undefined behaviour if $dt is "naive" as Moment has no concept of "naive".

```javascript
m.tz(tz ? tz.name : moment.tz.guess())
```

### dt.utcoffset()

```javascript
moment.duration(m.utcOffset() * 60 * 1000)
```

### dt.dst()

*Unsupported*.

### dt.tzname()

```javascript
m.tz()
```

### dt.timetuple()

*Unsupported*.

### dt.utctimetuple()

*Unsupported*.

### dt.toordinal()

*Same as d.toordinal()*.

### dt.timestamp()

```javascript
m.unix()
```

### dt.weekday()

*Same as d.weekday()*.

### dt.isoweekday()

*Same as d.isoweekday()*.

### dt.isocalendar()

*Same as d.isocalendar()*.

### dt.isoformat(sep="T", timespec="auto")

```javascript
(function wrapper() {
  if (timespec == "auto") {
    timespec = m.millisecond() == 0 ? "seconds" : "microseconds";
  }
  sep = sep == undefined ? "T" : sep;
  // Format date part first in case $sep is token
  var date = m.format("Y-MM-DD");
  var format = "HH";
  if (timespec != "hours") {
    format += ":mm";
    if (timespec != "minutes") {
      format += ":ss";
      if (timespec != "seconds") {
        format += ".SSS";
        if (timespec != "milliseconds") {
          format += "SSS";
        }
      }
    }
  }
  format += "Z";
  
  return date + sep + m.format(format);
})();
```

### dt.__str__

*Same as `dt.isoformat(" ")`*.

### dt.ctime()

**WARNING**: There may be unconsidered intricacies.

```javascript
m.toString()
```

### dt.strftime(format)

*Same as `d.strftime`*.

### dt.__format__(format)

*Unsupported*.

## time

*WARNING*: It's not suggested to use `time` by itself; use `datetime` instead:

- `time` still uses a `datetime`-equivalent underneath, but
  - uses an unknown year, month, and date
  - has unpredictable behaviour when it comes to time zone changes (because the date is unknown)

### time(hour=0, minute=0, second=0, microsecond=0, tzinfo=None, *, fold=0)

**NOTE**: $fold must be 0, due to moment-timezone fall back behaviour.

```javascript
moment.tz([0, 0, 1, hour, minute, second, microsecond / 1000], tzinfo.name)
```

### time.min

```javascript
moment.utc([0, 0, 1, 0, 0, 0, 0])
```

### time.max

```javascript
moment.utc([0, 0, 1, 23, 59, 59, 999.999])
```

### time.resolution

*Same as `datetime.resolution`*.

### t.hour

```javascript
m.hour()
```

### t.minute

```javascript
m.minute()
```

### t.second

```javascript
m.second()
```

### t.microsecond

```javascript
m.millisecond() * 1000
```

### t.tzinfo

*Same as `dt.tzinfo`*.

### t.fold

```javascript
0
```

## tzinfo

*Unsupported*.

## timezone

*Unsupported*.

## pytz.BaseTzZone
