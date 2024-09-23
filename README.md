# Disclaimer

- This project is a Work In progress, treat it as such. 

# Setting up the project

- You'll require a node version of 20.11.0 or higher.
- Run npm install in the directory of the project 
- run npm run dev to start the project
- run ./pocketBase/pocketbase.exe serve to start the pocketbase server (which will be used to store your unique token)

# Instructions

- Go to Sign up and create a username and input "COSMIC" as the faction ( Will eventually be a selectable list (SP018))

- When Signed in, press back and login with the credentials (Sign up should not redirect to main screen its a bug (SP019))

- Once logged in, The 'Select a ship' pop up will be displayed kindly select one (Mining Drone is suggested)

- The pink waypoint is your current ship's location, press it to interact with the waypoint.

- To Refuel and Trade at the market (WIP) your ship needs to be docked. 

- To Mine and navigate your ship needs to be in orbit. The required buttons will be displayed on the left of the screen.

- What you mine can be sold eventually at the market (That feature is still a work in progress).

- Currently contracts are a possible feature but the API has not supported more than the initial one. 
# TODO:

-------------------------

## - Allow persistent storage of key data - SP006
 - Current Location of Ships

## - Allow View Market Items up for barter - SP014

## - Allow Buying and Selling of cargo from the market - SP020

## - Figure out why token is being invalidated - SP017

## - Create list of factions in sign up page - SP018


## - Remake map using d3.js

# WIP


# Closed!

## ~~- Relocate sign up into different route - SP020~~

## ~~- Fix Sign up taking to main screen bug - SP019~~

## ~~- Add Filter by Trait in Starchart Section - SP003~~

## ~~- Add Action screen into bottom-left corner rather than new page for Waypoint details - SP004~~

## ~~- Add View ships functionality SP007~~

## ~~- Add Select Current Ship functionality - SP008~~

## ~~- TECHDEBT: Refactor Service to split file based on category - SP010~~

## ~~- Add Select Component for SP003 - SP009~~ 

## ~~- Add Cargo List into ship modal - SP012~~

## ~~- Add current waypoint data - SP011~~
 ~~- Add current Ship tracking~~
 ~~- Add stationary ship data (probably yellow idky)~~

## ~~- Highlight Current waypoint on starchart - SP001~~
~~- Will different ships be displayed on the screen?~~
~~ - Waiting on SP011~~

## ~~- Waypoint actions not referencing selected waypoint - SP015~~

## ~~- Add agent data update on key points - SP005~~

## ~~- Add Contract Details to the player console page - SP016~~

## ~~- Allow View Shipyard - SP013~~