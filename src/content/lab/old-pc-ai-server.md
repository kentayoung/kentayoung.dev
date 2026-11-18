---
title: Giving my old gaming PC a second job
description: Repurposing an old gaming PC as a Linux server to experiment with local language models and AI agents. What worked, what failed, and what I'm learning.
date: 2026-11-18
draft: true
topics:
  - Linux
  - Local LLMs
  - Self-hosting
status: Ongoing
---

I had an old gaming PC sitting around and was curious about running language models locally. Turning it into a Linux server seemed like a good way to use it again and learn something in the process.

The machine has an Intel i7-4770K, 16 GB of RAM, and a GTX 1070 with 8 GB of VRAM. I wanted to find out what I could reasonably do with the hardware I already owned.

I've been setting it up to run Hermes Agent, using Ollama for local models and Tailscale to access it remotely. The experimentation has included comparing models, troubleshooting incomplete responses, and building a way to monitor the hardware while everything runs.

## When the model thinks but doesn't answer

One recurring issue was a model stopping without producing a visible response. The error reported that its reasoning had consumed the entire output budget, even after continuation attempts.

That sent me into context sizes, output limits, and reasoning settings. I had to get clear on the difference between how much conversation a model can take in and how much it can generate in a response. Increasing one doesn't automatically solve a problem with the other.

We tested different settings, but the controlled tests haven't reproduced that original failure yet. It's still something to investigate rather than a fix I can confidently claim.

## Measuring more than speed

I also wanted to know whether the models could reliably use tools. A model answering a question is one thing. Having it read information, act on the result, and recover when something goes wrong is a different workload.

We put together a small Python benchmark with simulated tools and test data. It checked things like reading a record before answering, following a sequence of dependent actions, recovering from a missing record, and ignoring instructions embedded in tool output.

The failures were useful. One tested model returned text describing a tool call instead of making the structured call. Another configuration ran faster with reasoning disabled, but followed an injected instruction and made a simulated write it wasn't authorized to make.

That gave me a better way to evaluate the setup. Tokens per second mattered less when a model couldn't finish the task correctly.

## Keeping an eye on the machine

We built a lightweight dashboard to watch CPU and RAM usage, GPU utilization, VRAM, and temperatures from my laptop over Tailscale.

That made the hardware side easier to follow while testing. With an older GPU and limited memory, I wanted to see what was happening rather than guess why a response was taking a while.

## Still experimenting

The tests helped narrow down a more promising local configuration, but they were small, controlled experiments. They don't establish how reliably it will handle longer Hermes sessions with the full set of tools.

That's what I'm exploring next. For now, the old PC has a use again, and it's given me a hands-on reason to learn more about Linux services, local inference, remote access, and agent behavior.
