# Recat - Live Editor

  A simple base with live-reload, to aid development.

## ToDo

* Add LESS support.

* Implement dynamic trial loading.

## Notes

* To load a trial import it from default/main.js and export the as the default.

## Log

* 180726

  * 1910  Added the first trial, CSS slider.
  * 1949  Centered the slide button of CSS slider.

* 180727

  * 0040  Made the styling of CSS slider, more robust.

* 180807

  * 1817  Changed the module loading mechanism, so to avoid unclean commits.
  * 2308  Added an example, fill-container.

* 180813

  * 2220  Added a lib, utils.
  * 2250  Setup the base for a new trial, fit-text.
  * 2310  Prepared the structures for fit-text.

* 180814

  * 0045  Did a preliminary implementation of fit-text.
  * 0448  Improved fit-text.
  * 1400  Improved text-wrapping.
  * 1511  Added some dev tools, to fit-text.
  * 2121  Redid the algorithm for text-wrapping.
  * 2213  Fit-text done.

* 180815

  * 0200  Added a lib, test.
  * 0227  Tested the trial, fit-test and established its accuracy to be more than 98%.
  * 1248  Extracted out **getFontSize** of fit-text, as a module.
  * 1432  Made the libraries isomorphic.
  * 1605  Added line-break support to fit-text.

* 180816

  * 1458  Added the lib, dev.
  * 2247  Added dev.comparePerformance.

* 180823

  * 1815  Improved a few library functions.
  * 1855  Implemented a basic binary-search.
  * 1956  Failed in generalizing the inclusion logic of boundary values.
  * 2023  Started respecting errror margins.
  * 2130  Allowed for decimals.
  * 2130  Improved the logic.
  * 2236  Binary search, done.

* 180824

  * 0109  Started supporting reversed ranges.
