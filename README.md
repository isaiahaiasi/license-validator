# US State ID/Driver's License Validator

Just a small webpage that displays the states, if any, for which a given ID number is valid.

See the live version here:

https://isaiahaiasi.github.io/license-validator/

## A note on the python crawler

Although the data was originally pulled from [this handy website](https://success.myshn.net/Policy/Data_Identifiers/U.S._Driver%27s_License_Numbers), the data here has been forked substantially due to both errors and out-of-date information in the source data.

At this point, the data should not be updated via the crawler. If for whatever reason you wish to update via the crawler, it will be necessary to thoroughly cross-check the output with the current data to avoid any regressions.
