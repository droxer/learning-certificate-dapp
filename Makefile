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
	@echo "  make dev              Start development environment (Hardhat node)"
	@echo "  make hardhat-node     Start Hardhat node"
	@echo "  make next-dev         Start Next.js development server"
	@echo "  make compile          Compile smart contracts"
	@echo "  make test             Run smart contract tests"
	@echo "  make deploy           Deploy smart contracts to local network"
	@echo "  make clean            Clean build artifacts"
	@echo "  make stop             Stop all running services"
	@echo ""

# Install dependencies
.PHONY: install
install:
	pnpm install

# Start development environment
.PHONY: dev
dev: hardhat-node
	@echo "Development environment started!"
	@echo "- Hardhat node running on http://127.0.0.1:8545"
	@echo "To start Next.js dev server, run: make next-dev"

# Start Hardhat node in background
.PHONY: hardhat-node
hardhat-node:
	@echo "Starting Hardhat node..."
	@npx hardhat node > hardhat-node.log 2>&1 &
	@echo $$! > $(NODE_PID_FILE)
	@echo "Hardhat node started (PID: $$(cat $(NODE_PID_FILE)))"
	@echo "Logs are being written to hardhat-node.log"

# Start Next.js development server
.PHONY: next-dev
next-dev:
	@echo "Starting Next.js development server..."
	@pnpm next dev

# Compile smart contracts
.PHONY: compile
compile:
	pnpm hardhat compile

# Run tests
.PHONY: test
test:
	pnpm hardhat test

# Deploy contracts
.PHONY: deploy
deploy:
	pnpm hardhat run scripts/deploy.ts

# Clean build artifacts
.PHONY: clean
clean:
	pnpm hardhat clean

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