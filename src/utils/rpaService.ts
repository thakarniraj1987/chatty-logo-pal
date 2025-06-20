
export interface RPABot {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'error' | 'completed';
  duration: number; // in minutes
  startTime: string;
  lastActivity: string;
  pattern: string;
  environment: 'development' | 'testing' | 'production';
}

export const mockRPABots: RPABot[] = [
  {
    id: 'bot-001',
    name: 'Invoice Processing Bot',
    status: 'running',
    duration: 45,
    startTime: '2024-06-20T08:00:00Z',
    lastActivity: '2024-06-20T08:45:00Z',
    pattern: 'Daily at 8:00 AM',
    environment: 'production'
  },
  {
    id: 'bot-002',
    name: 'Data Migration Bot',
    status: 'completed',
    duration: 120,
    startTime: '2024-06-20T06:00:00Z',
    lastActivity: '2024-06-20T08:00:00Z',
    pattern: 'Weekly on Mondays',
    environment: 'production'
  },
  {
    id: 'bot-003',
    name: 'Report Generation Bot',
    status: 'error',
    duration: 15,
    startTime: '2024-06-20T07:30:00Z',
    lastActivity: '2024-06-20T07:45:00Z',
    pattern: 'Hourly during business hours',
    environment: 'production'
  }
];

export const generateRPAResponse = (userMessage: string): string => {
  const message = userMessage.toLowerCase();

  // Status queries
  if (message.includes('status') || message.includes('running')) {
    const runningBots = mockRPABots.filter(bot => bot.status === 'running');
    const errorBots = mockRPABots.filter(bot => bot.status === 'error');
    
    return `Current RPA Bot Status:
• ${runningBots.length} bots are currently running
• ${errorBots.length} bots have errors
• ${mockRPABots.filter(bot => bot.status === 'completed').length} bots completed successfully

Running bots: ${runningBots.map(bot => bot.name).join(', ')}
${errorBots.length > 0 ? `\nBots with errors: ${errorBots.map(bot => bot.name).join(', ')}` : ''}`;
  }

  // Duration queries
  if (message.includes('duration') || message.includes('time') || message.includes('long')) {
    const longRunningBots = mockRPABots.filter(bot => bot.duration > 60);
    
    return `Bot Duration Analysis:
• Average runtime: ${Math.round(mockRPABots.reduce((sum, bot) => sum + bot.duration, 0) / mockRPABots.length)} minutes
• Long-running bots (>60 min): ${longRunningBots.length}

Details:
${mockRPABots.map(bot => `• ${bot.name}: ${bot.duration} minutes (${bot.status})`).join('\n')}`;
  }

  // Pattern queries
  if (message.includes('pattern') || message.includes('schedule')) {
    return `RPA Bot Scheduling Patterns:

${mockRPABots.map(bot => `• ${bot.name}
  Pattern: ${bot.pattern}
  Environment: ${bot.environment}
  Last run: ${new Date(bot.lastActivity).toLocaleString()}`).join('\n\n')}`;
  }

  // Performance queries
  if (message.includes('performance') || message.includes('metrics')) {
    const successRate = (mockRPABots.filter(bot => bot.status === 'completed').length / mockRPABots.length) * 100;
    
    return `RPA Performance Metrics:
• Success rate: ${successRate.toFixed(1)}%
• Total active bots: ${mockRPABots.length}
• Average processing time: ${Math.round(mockRPABots.reduce((sum, bot) => sum + bot.duration, 0) / mockRPABots.length)} minutes
• Production bots: ${mockRPABots.filter(bot => bot.environment === 'production').length}

Recommendation: ${successRate < 80 ? 'Review error logs for failed processes' : 'Performance is within normal parameters'}`;
  }

  // Environment queries
  if (message.includes('environment') || message.includes('production') || message.includes('development')) {
    const envBreakdown = mockRPABots.reduce((acc, bot) => {
      acc[bot.environment] = (acc[bot.environment] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return `RPA Environment Distribution:
${Object.entries(envBreakdown).map(([env, count]) => `• ${env.charAt(0).toUpperCase() + env.slice(1)}: ${count} bots`).join('\n')}

Production bots status:
${mockRPABots.filter(bot => bot.environment === 'production').map(bot => `• ${bot.name}: ${bot.status}`).join('\n')}`;
  }

  // Error queries
  if (message.includes('error') || message.includes('failed') || message.includes('issue')) {
    const errorBots = mockRPABots.filter(bot => bot.status === 'error');
    
    if (errorBots.length === 0) {
      return 'Good news! No RPA bots are currently experiencing errors. All systems are running smoothly.';
    }

    return `RPA Error Analysis:
${errorBots.map(bot => `• ${bot.name}
  Status: Error detected
  Runtime before error: ${bot.duration} minutes
  Last activity: ${new Date(bot.lastActivity).toLocaleString()}
  Recommended action: Check logs and restart process`).join('\n\n')}

Would you like me to provide troubleshooting steps for any specific bot?`;
  }

  // Default RPA assistance
  return `I'm here to help with your RPA bot inquiries! I can provide information about:

📊 **Bot Status** - Current running, stopped, or error states
⏱️ **Duration & Performance** - Runtime analysis and long-running processes  
📅 **Scheduling Patterns** - When bots run and their frequencies
🌍 **Environment Details** - Production, testing, and development bots
🔧 **Error Analysis** - Failed processes and troubleshooting
📈 **Performance Metrics** - Success rates and optimization insights

What specific RPA information would you like to know about?`;
};
