# Makefile for Learning Certificate DApp Development

# Variables
NODE_PID_FILE := .hardhat-node.pid

# Default target
.PHONY: help
help:
	@echo "Learning Certificate DApp - Development Commands"
	@echo ""
	@echo "Usage:"
	@echo "  make install          Install all dependencies"
	@echo "  make dev              Start Hardhat node"
	@echo "  make hardhat-node     Start Hardhat node"
	@echo "  make compile          Compile smart contracts"
	@echo "  make test             Run smart contract tests"
	@echo "  make deploy           Deploy smart contracts to local network"
	@echo "  make clean            Clean build artifacts"
	@echo "  make stop             Stop all running services"
	@echo ""

# Install dependencies
.PHONY: install
install:
	npm install

# Start Hardhat node
.PHONY: dev
dev: hardhat-node
	@echo "Development environment started!"
	@echo "- Hardhat node running on http://127.0.0.1:8545"

# Start Hardhat node in background
.PHONY: hardhat-node
hardhat-node:
	@echo "Starting Hardhat node..."
	@npx hardhat node > hardhat-node.log 2>&1 &
	@echo $$! > $(NODE_PID_FILE)
	@echo "Hardhat node started (PID: $$(cat $(NODE_PID_FILE)))"
	@echo "Logs are being written to hardhat-node.log"

# Compile smart contracts
.PHONY: compile
compile:
	npx hardhat compile

# Run tests
.PHONY: test
test:
	npx hardhat test

# Deploy contracts
.PHONY: deploy
deploy:
	npx hardhat run scripts/deploy.ts

# Clean build artifacts
.PHONY: clean
clean:
	npx hardhat clean

# Stop all running services
.PHONY: stop
stop:
	@if [ -f $(NODE_PID_FILE) ]; then \
		kill $$(cat $(NODE_PID_FILE)) 2>/dev/null || true; \
		rm -f $(NODE_PID_FILE); \
		echo "Hardhat node stopped"; \
	fi
	@echo "All services stopped"

# Clean up on exit
.PHONY: cleanup
cleanup:
	rm -f $(NODE_PID_FILE)