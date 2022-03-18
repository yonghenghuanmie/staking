const MetaCoin = artifacts.require("MetaCoin");
const Staking = artifacts.require("Staking");

contract("staking then unstaking", async (accounts) => {
	let [alice, bob] = accounts;
	let instanceOfCoin,instanceOfStake;
    before(async () => {
		console.log("alice:"+alice+"\nbob:"+bob);

		MetaCoin.defaults({from: alice});
		instanceOfCoin = await MetaCoin.deployed();
		await instanceOfCoin.mint(1000);
		Staking.defaults({from: alice});
		instanceOfStake = await Staking.deployed();
		//approve
		await instanceOfCoin.approve(instanceOfStake.address,0xFFFFFFFF);
    });
	
	it("should staking 500 from metacoin to xtoken", async () => {
		let result = await instanceOfStake.staking(instanceOfCoin.address, alice, 500);
		assert.equal(result.receipt.status, true);
		result = await instanceOfCoin.balanceOf.call(alice);
		assert.equal(result, 500);
		result = await instanceOfStake.balanceOf.call(instanceOfCoin.address, alice);
		assert.equal(result, 500);
	});

	it("should unstaking 250 from xtoken to metacoin", async () => {
		result = await instanceOfStake.unstaking(instanceOfCoin.address, alice, 250);
		assert.equal(result.receipt.status, true);
		result = await instanceOfCoin.balanceOf.call(alice);
		assert.equal(result, 750);
		result = await instanceOfStake.balanceOf.call(instanceOfCoin.address, alice);
		assert.equal(result, 250);
	});
});

contract("staking failed condition", async (accounts) => {
	let [alice, bob] = accounts;
	let instanceOfCoin,instanceOfStake;
    before(async () => {
		console.log("alice:"+alice+"\nbob:"+bob);

		MetaCoin.defaults({from: alice});
		instanceOfCoin = await MetaCoin.deployed();
		await instanceOfCoin.mint(1000);
		Staking.defaults({from: alice});
		instanceOfStake = await Staking.deployed();
		//approve
		await instanceOfCoin.approve(instanceOfStake.address,0xFFFFFFFF);
    });

	it("should failed because not enough balance", async () => {
		try {
			await instanceOfStake.staking(instanceOfCoin.address, alice, 1500);
			assert(false);
		} catch {}
	});

	it("should failed because of wrong address", async () => {
		try {
			await instanceOfStake.staking(instanceOfCoin.address, alice, 500,{form:bob});
			assert(false);
		} catch {}
	});

	it("should failed because of wrong token address", async () => {
		try {
			await instanceOfStake.staking(instanceOfStake.address, alice, 500);
			assert(false);
		} catch {}
	});
});

contract("unstaking failed condition", async (accounts) => {
	let [alice, bob] = accounts;
	let instanceOfCoin,instanceOfStake;
    before(async () => {
		console.log("alice:"+alice+"\nbob:"+bob);

		MetaCoin.defaults({from: alice});
		instanceOfCoin = await MetaCoin.deployed();
		await instanceOfCoin.mint(1000);
		Staking.defaults({from: alice});
		instanceOfStake = await Staking.deployed();
		//approve
		await instanceOfCoin.approve(instanceOfStake.address,0xFFFFFFFF);
    });

	it("should failed because not enough balance", async () => {
		let result = await instanceOfStake.staking(instanceOfCoin.address, alice, 500);
		assert.equal(result.receipt.status, true);
		try {
			await instanceOfStake.unstaking(instanceOfCoin.address, alice, 1000);
			assert(false);
		} catch {}
	});
});

contract("unstaking failed condition", async (accounts) => {
	let [alice, bob] = accounts;
	let instanceOfCoin,instanceOfStake;
    before(async () => {
		console.log("alice:"+alice+"\nbob:"+bob);

		MetaCoin.defaults({from: alice});
		instanceOfCoin = await MetaCoin.deployed();
		await instanceOfCoin.mint(1000);
		Staking.defaults({from: alice});
		instanceOfStake = await Staking.deployed();
		//approve
		await instanceOfCoin.approve(instanceOfStake.address,0xFFFFFFFF);
    });

	it("should failed because of wrong address", async () => {
		let result = await instanceOfStake.staking(instanceOfCoin.address, alice, 500);
		assert.equal(result.receipt.status, true);
		try {
			await instanceOfStake.unstaking(instanceOfCoin.address, alice, 250,{form:bob});
			assert(false);
		} catch {}
	});
});

contract("unstaking failed condition", async (accounts) => {
	let [alice, bob] = accounts;
	let instanceOfCoin,instanceOfStake;
    before(async () => {
		console.log("alice:"+alice+"\nbob:"+bob);

		MetaCoin.defaults({from: alice});
		instanceOfCoin = await MetaCoin.deployed();
		await instanceOfCoin.mint(1000);
		Staking.defaults({from: alice});
		instanceOfStake = await Staking.deployed();
		//approve
		await instanceOfCoin.approve(instanceOfStake.address,0xFFFFFFFF);
    });

	it("should failed because of wrong token address", async () => {
		let result = await instanceOfStake.staking(instanceOfCoin.address, alice, 500);
		assert.equal(result.receipt.status, true);
		try {
			await instanceOfStake.unstaking(instanceOfStake.address, alice, 250);
			assert(false);
		} catch {}
	});
});