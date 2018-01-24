/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page? 
		 * R: The Rss Feeds will not be loaded, causing some expectations to fail
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

		it('has URL', function() {
			allFeeds.forEach(function(f){
				expect(f.url).toBeDefined();
				expect(f.url).not.toBe(0);
			});
		});
		
		it('has name', function() {
			allFeeds.forEach(function(f){
				expect(f.name).toBeDefined();
				expect(f.name).not.toBe(0);
			});
		});
    });

	/* The first expect checks if the body element has the 'menu-hidden' class
	 * The second one triggers the click event on the button and checks
	 * if the class will be added then removed.
	 */
	describe('The menu', function() {
		it('is hidden by default', function(){
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});
		
		it('changes visibility when clicked', function() {
			$('.icon-list').click();
			expect($('body').hasClass('menu-hidden')).toBe(false);
			$('.icon-list').click();
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});
	});

	// The expect checks if there is more than 0 children on .feed element
	describe('Initial Entries', function(){
		beforeEach(function(done){
			loadFeed(0, done);
		});
		it('loaded', function(done){
			expect($('.feed').children().length).toBeGreaterThan(0);
			done();
		});
	});

	/* Here i call the loadFeed function once and store the html of the .feed element
	 * then i call it again and store the html on another variable
	 * On the expect i check if their values are not the same
	 */
	describe('New Feed Selection', function(){
		beforeEach(function(done){
			loadFeed(0, function(){
				before = $('.feed').html();
			});
			loadFeed(1, function(){
				after = $('.feed').html();
				done();
			});
		});
		it('changes the content', function(done){
			expect(before).not.toEqual(after);
			done();
		});
	});
}());
