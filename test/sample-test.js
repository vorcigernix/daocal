const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("Post", async function () {
  it("Should create a post", async function () {
    const Event = await ethers.getContractFactory("Event")
    const event = await Event.deploy("My event")
    await event.deployed()
    await event.createPost("My first post", "12345")

    const posts = await event.fetchPosts()
    expect(posts[0].title).to.equal("My first post")
  })

  it("Should edit a post", async function () {
    const Event = await ethers.getContractFactory("Event")
    const event = await Event.deploy("My event")
    await event.deployed()
    await event.createPost("My Second post", "12345")

    await event.updatePost(1, "My updated post", "23456", true)

    posts = await event.fetchPosts()
    expect(posts[0].title).to.equal("My updated post")
  })

  it("Should add update the name", async function () {
    const Event = await ethers.getContractFactory("Event")
    const event = await Event.deploy("My event")
    await event.deployed()

    expect(await event.name()).to.equal("My event")
    await event.updateName('My new event')
    expect(await event.name()).to.equal("My new event")
  })
})