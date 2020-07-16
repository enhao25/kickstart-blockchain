// Specific version of solidity to use
pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;
    
    function createCampaign(uint minimum) public {
        // Create a new instance of Campaign
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    function getDeployedCampaigns() public view returns(address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    address public manager;
    uint public minimumContribution;
    uint approversCount;
    mapping(address => bool) public approvers;
    Request[] public requests;
    // Constructor
    function Campaign(uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }
    // Resricted access to only manager
    modifier restrictedAccess() {
        require(msg.sender == manager);
        _;
    }
    function contribute() public payable {
        // Ensure that the user put in at least the minimumContribution
        require(msg.value >= minimumContribution);
        // Add the user as a approvers
        approvers[msg.sender] = true;
        approversCount++;
    }
    function createRequest(string description, uint value, address recipient) 
        public restrictedAccess {
            // Create a new request instance (Only exist in memeory) and store it in newRequest
            Request memory newRequest = Request({
               description: description,
               value: value,
               recipient: recipient,
               complete: false,
               approvalCount: 0
            }); // Do not need to initialize a reference type of mapping
            // Push the newRequest into the requests array
            requests.push(newRequest);
        }
    function approveRequest(uint index) public {
        Request storage request = requests[index];
        // Check if the person has donated to the project
        require(approvers[msg.sender]);
        // Check if the person hasn't voted before
        require(!request.approvals[msg.sender]);
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }
    function finalizeRequest(uint index) public restrictedAccess {
        Request storage request = requests[index];
        // Require at least 50% of people to vote yes before we can finalize the request
        require(request.approvalCount > (approversCount / 2));
        // Ensure that the request is not yet complete
        require(!request.complete);
        // Transfer the money to the recipient
        request.recipient.transfer(request.value);
        // Complete the request
        request.complete = true;
    }

    function getSummary() public view returns (
        uint, uint, uint, uint, address
    ) {
        return (
            minimumContribution,
            this.balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
}