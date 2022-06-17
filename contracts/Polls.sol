// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Poll {
    struct Candidate {
        string name;
        uint256 voteCount;
    }

    struct Voter {
        bool authorized;
        bool voted;
        string name;
    }

    modifier ownerOnly() {
        require(msg.sender == owner);
        _;
    }

    modifier inState(State _state) {
        require(state == _state);
        _;
    }

    address public owner;
    string public pollName;

    mapping(address => Voter) public voters;
    Candidate[] candidates;
    uint256 public totalVotes;
    uint256 public totalVoters;

    enum State {
        Created,
        Voting,
        Ended
    }
    State public state;

    constructor(string memory _name) {
        owner = msg.sender;
        pollName = _name;

        state = State.Created;
    }

    function addCandidate(string memory _name) public ownerOnly {
        candidates.push(Candidate(_name, 0));
    }

    function getCandidates() public view returns (uint256) {
        return candidates.length;
    }

    function authorize(address _person) public ownerOnly {
        voters[_person].authorized = true;
        totalVoters++;
    }

    function addVoter(string memory _voterName) public inState(State.Created) {
        voters[msg.sender] = Voter(false, false, _voterName);
    }

    function startVote() public ownerOnly inState(State.Created) {
        state = State.Voting;
    }

    function doVote(uint256 _voteIndex) public inState(State.Voting) {
        require(!voters[msg.sender].voted);
        require(voters[msg.sender].authorized);

        candidates[_voteIndex].voteCount++;

        voters[msg.sender].voted = true;
        totalVotes++;
    }

    function endVote() public ownerOnly inState(State.Voting) {
        state = State.Ended;
    }

    function getResult()
        public
        view
        ownerOnly
        inState(State.Ended)
        returns (Candidate[] memory)
    {
        return candidates;
    }
}
