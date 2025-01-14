// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CarbonCreditPlatform {
    address payable public owner;
    uint256 public balance;
    uint256 public totalDeposited;
    uint256 public totalWithdrawn;
    
    // Mapping to track carbon credits owned by users
    mapping(address => uint256) private carbonCredits;

    // Events to log actions
    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event CarbonCreditsMinted(address indexed user, uint256 amount);
    event CarbonCreditsTransferred(address indexed from, address indexed to, uint256 amount);
    event CarbonCreditsBurned(address indexed user, uint256 amount);

    // Constructor to initialize the contract with the initial balance
    constructor(uint256 initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
        totalDeposited = 0;
        totalWithdrawn = 0;
    }

    // Function to get the current balance of the contract
    function getBalance() public view returns (uint256) {
        return balance;
    }

    // Function to get the total amount deposited
    function getTotalDeposited() public view returns (uint256) {
        return totalDeposited;
    }

    // Function to get the total amount withdrawn
    function getTotalWithdrawn() public view returns (uint256) {
        return totalWithdrawn;
    }

    // Function to deposit funds into the contract
    function deposit(uint256 _amount) public payable {
        uint256 previousBalance = balance;
        
        // Only the owner can deposit
        require(msg.sender == owner, "You are not the owner of this account");
        
        // Ensure the deposit amount is greater than 0
        require(_amount > 0, "Deposit amount must be greater than zero");

        balance += _amount;
        totalDeposited += _amount;

        // Ensure the balance updated correctly
        require(balance == previousBalance + _amount, "Balance update failed");

        emit Deposit(_amount);
    }

    // Function to withdraw funds from the contract
    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        
        uint256 previousBalance = balance;
        
        // Ensure the withdrawal amount is valid
        require(_withdrawAmount > 0, "Withdrawal amount must be greater than zero");

        // Check for sufficient balance
        require(balance >= _withdrawAmount, "Insufficient balance");

        balance -= _withdrawAmount;
        totalWithdrawn += _withdrawAmount;

        // Ensure the balance updated correctly
        require(balance == previousBalance - _withdrawAmount, "Balance update failed");

        emit Withdraw(_withdrawAmount);
    }

    // Function to mint carbon credits (ERC20 tokens)
    function mintCarbonCredits(address to, uint256 amount) external {
        require(msg.sender == owner, "Only the owner can mint carbon credits");
        
        // Increase the user's carbon credits
        carbonCredits[to] += amount;
        
        // Increase the contract's balance by minted credits
        balance += amount;

        // Emit the event for minting carbon credits
        emit CarbonCreditsMinted(to, amount);
    }

    // Function to transfer carbon credits
    function transferCarbonCredits(address to, uint256 amount) external {
        require(carbonCredits[msg.sender] >= amount, "Insufficient carbon credits");
        
        // Transfer the carbon credits
        carbonCredits[msg.sender] -= amount;
        carbonCredits[to] += amount;
        
        emit CarbonCreditsTransferred(msg.sender, to, amount);
    }

    // Function to burn carbon credits (retire them)
    function burnCarbonCredits(uint256 amount) external {
        require(carbonCredits[msg.sender] >= amount, "Insufficient carbon credits");
        
        // Decrease the user's carbon credits and contract balance
        carbonCredits[msg.sender] -= amount;
        
        // Ensure balance cannot go negative
        require(balance >= amount, "Contract balance insufficient to burn credits");

        balance -= amount; // Decrease contract balance when credits are burned
        
        emit CarbonCreditsBurned(msg.sender, amount);
    }

    // Function to get the carbon credits of a specific user
    function getCarbonCredits(address account) external view returns (uint256) {
        return carbonCredits[account];
    }

    // Error handling for insufficient balance during withdrawal
    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);
}
