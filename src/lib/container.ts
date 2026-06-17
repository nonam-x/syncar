// Repositories
import { UserRepository } from "@/server/repositories/user.repository";
import { EmailRepository } from "@/server/repositories/email.repository";
import { EmailDraftRepository } from "@/server/repositories/email-draft.repository";
import { CalendarEventRepository } from "@/server/repositories/calendar-event.repository";
import { AIConversationRepository } from "@/server/repositories/ai-conversation.repository";

// Services
import { AIService } from "@/server/services/ai.service";
import { ClassificationService } from "@/server/services/classification.service";
import { EmailService } from "@/server/services/email.service";
import { CalendarService } from "@/server/services/calendar.service";
import { SearchService } from "@/server/services/search.service";
import { WebhookService } from "@/server/services/webhook.service";

// Use Cases
import { ListEmailsUseCase } from "@/server/use-cases/emails/list-emails.use-case";
import { GetEmailUseCase } from "@/server/use-cases/emails/get-email.use-case";
import { SendEmailUseCase } from "@/server/use-cases/emails/send-email.use-case";
import { DraftEmailUseCase } from "@/server/use-cases/emails/draft-email.use-case";
import { SearchEmailsUseCase } from "@/server/use-cases/emails/search-emails.use-case";
import { UpdateEmailUseCase } from "@/server/use-cases/emails/update-email.use-case";
import { DeleteEmailUseCase } from "@/server/use-cases/emails/delete-email.use-case";

import { ListEventsUseCase } from "@/server/use-cases/calendar/list-events.use-case";
import { CreateEventUseCase } from "@/server/use-cases/calendar/create-event.use-case";
import { UpdateEventUseCase } from "@/server/use-cases/calendar/update-event.use-case";
import { GetAvailabilityUseCase } from "@/server/use-cases/calendar/get-availability.use-case";

import { ChatUseCase } from "@/server/use-cases/ai/chat.use-case";
import { ClassifyEmailUseCase } from "@/server/use-cases/ai/classify-email.use-case";
import { ProcessWebhookUseCase } from "@/server/use-cases/webhooks/process-webhook.use-case";

// Instantiate singletons for the application
export const userRepository = new UserRepository();
export const emailRepository = new EmailRepository();
export const emailDraftRepository = new EmailDraftRepository();
export const calendarEventRepository = new CalendarEventRepository();
export const aiConversationRepository = new AIConversationRepository();

export const aiService = new AIService();
export const classificationService = new ClassificationService(emailRepository, aiService);
export const emailService = new EmailService(emailRepository, emailDraftRepository, classificationService);
export const calendarService = new CalendarService(calendarEventRepository);
export const searchService = new SearchService(emailRepository, aiService);
export const webhookService = new WebhookService(
  emailRepository,
  calendarEventRepository,
  classificationService,
  emailService,
  calendarService
);

// Wire Use Cases
export const listEmailsUseCase = new ListEmailsUseCase(emailService);
export const getEmailUseCase = new GetEmailUseCase(emailService);
export const sendEmailUseCase = new SendEmailUseCase(emailService);
export const draftEmailUseCase = new DraftEmailUseCase(emailService);
export const searchEmailsUseCase = new SearchEmailsUseCase(searchService);
export const updateEmailUseCase = new UpdateEmailUseCase(emailService);
export const deleteEmailUseCase = new DeleteEmailUseCase(emailService);

export const listEventsUseCase = new ListEventsUseCase(calendarService);
export const createEventUseCase = new CreateEventUseCase(calendarService);
export const updateEventUseCase = new UpdateEventUseCase(calendarService);
export const getAvailabilityUseCase = new GetAvailabilityUseCase(calendarService);

export const chatUseCase = new ChatUseCase(aiConversationRepository);
export const classifyEmailUseCase = new ClassifyEmailUseCase(classificationService);
export const processWebhookUseCase = new ProcessWebhookUseCase(webhookService);
