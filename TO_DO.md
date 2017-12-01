
+Save button for doc edits
  +bar at the top of the DocEdit component. Position remains, even with scroll.
  +date and time of last save appear to the right of button.
+`<Loading>` Component and animation
+DocList -- fetch only doc name, not whole document
-doc list -- maybe separate fetch documents action so it passes thru only docnames reducer...
-DocList styling -- delete function as well
-Login/Signup styling
+New document process
-class folders
-tabs for open docs
-need something that says database is working when clicking on buttons that make http requests. There is sometimes lag.(new doc, edit doc)
-simplify document create action in controller


note:
  For faster page loading, I disabled debugging in development mode. In the file `development.rb`, I changed `config.assets.debug`to false. See http://guides.rubyonrails.org/asset_pipeline.html#turning-debugging-off
  https://artandlogic.com/2012/12/faster-rails-dev/
