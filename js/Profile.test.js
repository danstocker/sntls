/*global sntls, troop, module, test, ok, equal, strictEqual, deepEqual, notDeepEqual, raises, expect */
(function (Profile) {
    module("Profile");

    test("Creation", function () {
        var profile = Profile.create();

        deepEqual(profile.counters, {}, "Counters' initial state");
    });

    test("Increment", function () {
        var profile = Profile.create();

        strictEqual(profile.inc('foo'), profile, "Increment returns self");
        ok(profile.counters.hasOwnProperty('foo'), "New counter added");
        equal(profile.counters.foo, 1, "New counter incremented");

        profile.inc('foo');
        equal(profile.counters.foo, 2, "Counter incremented");

        profile.inc('foo', 3);
        equal(profile.counters.foo, 5, "Counter incremented by 3");
    });

    test("Decrement", function () {
        var profile = Profile.create();

        strictEqual(profile.dec('foo'), profile, "Decrement returns self");
        ok(profile.counters.hasOwnProperty('foo'), "New counter added");
        equal(profile.counters.foo, -1, "New counter decremented");

        profile.dec('foo');
        equal(profile.counters.foo, -2, "Counter decreased");

        profile.dec('foo', 3);
        equal(profile.counters.foo, -5, "Counter decreased by 3");
    });

    test("Retrieval", function () {
        var profile = Profile.create();

        profile.inc('foo');
        equal(profile.counter('foo'), profile.counters.foo, "Counter value");
    });

    test("Resetting", function () {
        var profile = Profile.create()
            .inc('foo')
            .inc('bar', 5)
            .inc('hello', 2);

        deepEqual(profile.counters, {
            foo  : 1,
            bar  : 5,
            hello: 2
        }, "Counters after initialization");

        profile.reset('hello');
        deepEqual(profile.counters, {
            foo: 1,
            bar: 5
        }, "Hello removed");

        profile.reset();
        deepEqual(profile.counters, {}, "Counters after full reset");
    });
}(sntls.Profile));
