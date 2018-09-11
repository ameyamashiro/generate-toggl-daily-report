# Generate Toggl Daily Report

this generates a daily report table for markdown like the follwing.

```
## Project A
[完了]

task|schedule|spent|note
:---|---:|---:|:---
Check | | 0:27

[完了]

task|schedule|spent|note
:---|---:|---:|:---
About FooBar | 1:30 | 1:53

## Misc
[完了]

task|schedule|spent|note
:---|---:|---:|:---
Foo Foo | | 0:07
```

### Requirements

node (development version is 10.9.0)

## How to use

### Install

```
npm i -g git+https://github.com/ameyamashiro/generate-toggl-daily-report.git
```

### Get your toggl token

[here](https://toggl.com/app/profile)

### Execute

```
daily-report --token '{{TOGGL_TOKEN}}' (yyyy-mm-dd)
```

you can omit the date for today.

#### Environment variable

`DR_TOGGL_TOKEN` is automatically used for the token.
If your environment set DR_TOGGL_TOKEN value, you can omit `--token` option.

```
DR_TOGGL_TOKEN='{{TOGGL_TOKEN}}'  # bash like shells
set -x DR_TOGGL_TOKEN {{TOGGL_TOKEN}}  # fish shell

daily-report  # generate a report for today
```
